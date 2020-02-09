# git-deploy

A microservice that handles git webhook requests and deploys your application.

## Usage

-	Prepare/adjust the `docker-compose.yml` file.
	-	Environment variables: `destination`, `remote`, `branch`
	-	Local directory mount - should match the `destination` variable
-	Configure a webhook in github
	-	Enter the respective endpoint
	-	Select _application/json_ as a content type
