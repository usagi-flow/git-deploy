import simplegit from "simple-git";
import {Git} from "simple-git/src/index";
import { execSync, ExecSyncOptionsWithStringEncoding } from "child_process";

export default class Deployer
{
	public static deploy() : void
	{
		let execOptions : ExecSyncOptionsWithStringEncoding = {
			encoding: "utf8",
			stdio: "inherit"
		};

		Deployer.updateRepository();

		if (process.env.build_command)
		{
			console.log("Performing build step");
			execSync(process.env.build_command, execOptions);
			console.log("Build step finished");
		}
	}

	private static updateRepository() : Git
	{
		console.log("Updating local repository");

		if (!process.env.destination)
			throw new Error("The \"destination\" environment variable must be set to point to the local repository");
		if (!process.env.remote)
			throw new Error("The \"remote\" environment variable must be set to point to a valid remote (e.g. \"origin\")");
		if (!process.env.branch)
			throw new Error("The \"branch\" environment variable must be set to point to a valid branch (e.g. \"stable\")");

		return simplegit(process.env.destination)
			.checkout(process.env.branch)
			.pull(process.env.remote, process.env.branch);
	}
}