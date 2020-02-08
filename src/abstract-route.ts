import * as express from "express";

export default abstract class AbstractRoute
{
	private router : express.Router;

	public constructor()
	{
		this.router = express.Router();

		this.configureHandlers();
	}

	protected abstract configureHandlers() : void;

	protected registerHandler(endpoint : string,
		handler : (request : express.Request, response : express.Response, next : express.NextFunction) => void) : void
	{
		this.router.get(endpoint,
			(request : express.Request, response : express.Response, next : express.NextFunction) =>
				handler(request, response, next));
	}

	public getRouter() : express.Router
	{
		return this.router;
	}
}