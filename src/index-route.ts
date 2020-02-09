import * as express from "express";
import AbstractRoute from "./abstract-route";
import Deployer from "./deployer";

export default class IndexRoute extends AbstractRoute
{
	protected configureHandlers() : void
	{
		this.registerHandler("/", this.handler);
	}

	private handler(request : express.Request, response : express.Response, next : express.NextFunction) : void
	{
		if (request.body)
		{
			console.log("[HTTP request] " + request.url);

			try
			{
				Deployer.deploy();
				console.log("Deployment succeeded");
				response.statusCode = 200;
				response.send("");
			}
			catch (e)
			{
				console.error("An error occurred: " + e);
				response.statusCode = 500;
				response.send("");
			}
		}
		else
		{
			console.error("[HTTP 500] Empty request body");
			response.statusCode = 400;
			response.send("");
		}
	}
}