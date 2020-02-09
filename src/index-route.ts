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
		if (request.body)
		{
			console.log("[HTTP request] " + request.baseUrl);

			if (request.body.hook.config.secret)
				console.log("  -> Secret: " + request.body.hook.config.secret);

			response.statusCode = 200;
			response.send("");
		}
		else
		{
			console.error("[HTTP 500] Empty request body");
			response.statusCode = 400;
			response.send("");
		}
	}
}