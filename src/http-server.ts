import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import * as express from "express";
import * as bodyParser from "body-parser";

import IndexRoute from "./index-route";

export default class HTTPServer
{
	protected static SERVER_SIDE_VIEWS : boolean = false;

	private express : express.Application;
	private httpServer : http.Server;

	protected readonly root : string;
	protected readonly port : number;

	private constructor(root : string, port : number)
	{
		console.log("Initializing server");
		this.express = express();
		this.httpServer = http.createServer(this.express);
		this.root = root;
		this.port = port;
		this.configure();
	}

	private configure() : void
	{
		if (HTTPServer.SERVER_SIDE_VIEWS)
		{
			console.log("Setting up view engine for directory: " + path.join(this.root, "views"));
			this.express.set("views", path.join(this.root, "views"));
			this.express.set("view engine", "hbs");

			console.log("Setting up routes");
			this.express.use(bodyParser.json());
			this.express.use("/", new IndexRoute().getRouter());
			this.express.use(this.fallbackHandler);
		}
		else
		{
			console.log("Setting up routes");
			this.express.use(bodyParser.json());
			this.express.use("/", new IndexRoute().getRouter());
			this.express.use(this.fallbackHandler);
		}

		this.express.set("port", this.port);

		this.httpServer.on("listening", this.onListening.bind(this));
		this.httpServer.on("error", this.onError.bind(this));

		console.log("Server directory: " + this.root);
		fs.readdirSync(this.root).forEach(file => console.log("- " + file));
	}

	private fallbackHandler(request : express.Request, response : express.Response, next : express.NextFunction) : void
	{
		console.log("[HTTP 404] " + request.url);

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("content-type", "text/html");
		response.setHeader("Cache-Control", "no-store");

		response.statusCode = 404;
		response.send('<!DOCTYPE html><html><body style="font-family: arial, sans serif; text-align: center;">' +
			'<h1>:-|</h1><p>404 - Not found</p></body></html>');
	}

	private onListening() : void
	{
		console.log("Listening on http://localhost:" + this.port);
	}

	private onError(error : Error) : void
	{
		throw error;
	}

	public start() : HTTPServer
	{
		this.httpServer.listen(this.port);
		return this;
	}

	public static create(root : string, port : number) : HTTPServer
	{
		return new HTTPServer(root, port);
	}
}