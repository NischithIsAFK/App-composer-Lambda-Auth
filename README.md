# Login workflow using AWS App Composer

### Introduction

This SAM template file can dynamically update the SAM template using visual workflow. It can dynamically add permissions if we connect the services, quickly add lambda layers and connect the layers with lambda so it will be added to a lambda.
In this application Login workflow using Infrastructure Composer where Custom Authorizer/ Lambda Authorizer is used.

### Steps to execute:

- `sam build`
- `sam deploy --profile <your AWS account name configured in AWS CLI>`
- Using POST request with valid API url send the data in this format.
- `{ "emailid" : "<your emaild id in database>", "password":"<your password>" }`
- Now you will get JWT token.
- Use that JWT in headers in the secured lambda function invocation.
