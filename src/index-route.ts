import * as express from "express";
import AbstractRoute from "./abstract-route";

export default class IndexRoute extends AbstractRoute
{
	protected configureHandlers() : void
	{
		this.registerHandler("/", this.handler);
	}

	private handler(request : express.Request, response : express.Response, next : express.NextFunction) : void
	{
		console.log("[HTTP request] " + request.baseUrl);
		response.statusCode = 200;
		response.send("");
	}
}