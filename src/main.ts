import HTTPServer from "./http-server";

class ServerStarter
{
	protected static SOCKET : string = process.env.SOCKET || "/opt/common/ipc.socket";

	protected readonly root : string;

	private server? : HTTPServer;

	protected constructor(root? : string)
	{
		this.root = root ? root : process.cwd();
	}

	public getServer() : HTTPServer | null
	{
		return this.server ? this.server : null;
	}

	protected startHTTPServer() : void
	{
		let port : number = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;
		this.server = HTTPServer.create(this.root, port);
		this.server.start();
	}

	protected start() : ServerStarter
	{
		this.startHTTPServer();
		return this;
	}

	public static start(root? : string) : ServerStarter
	{
		return new ServerStarter(root).start();
	}
}

ServerStarter.start();