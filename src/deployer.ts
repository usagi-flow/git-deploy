import simplegit from "simple-git";
import {Git} from "simple-git/src/index";

export default class Deployer
{
	public static deploy() : Git
	{
		if (!process.env.destination)
			throw new Error("The \"destination\" environment variable must be set to point to the local repository");
		if (!process.env.remote)
			throw new Error("The \"remote\" environment variable must be set to point to a valid remote (e.g. \"origin\")");
		if (!process.env.branch)
			throw new Error("The \"branch\" environment variable must be set to point to a valid branch (e.g. \"stable\")");

		return simplegit(process.env.destination).pull(process.env.remote, process.env.branch);
	}
}