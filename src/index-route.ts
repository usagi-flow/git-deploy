import * as express from "express";
import AbstractRoute from "./abstract-route";

export default class IndexRoute extends AbstractRoute
{
	protected configureHandlers() : void
	{
		this.registerHandler("/", this.handler);
	}

	private handler(mrequest : express.Request, response : express.Response, next : express.NextFunction) : void
	{
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("content-type", "text/plain");
		response.setHeader("Cache-Control", "no-store");
		response.send("Hello world!");
	}
}