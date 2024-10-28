import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import jwt from "jsonwebtoken";

const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);
const JWT_SECRET = process.env.JWT_SECRET;
const TABLE_NAME = "auth-lambda-users-HQFN2BIW3N9K";

const sendResponse = (status, body) => {
  return {
    statusCode: status,
    body: JSON.stringify(body),
  };
};

export const handler = async (event) => {
  try {
    console.log("Received event: ", event);

    const eventBody = JSON.parse(event.body);
    const { emailid, password } = eventBody;

    const params = {
      TableName: TABLE_NAME,
      Key: { email: emailid },
    };

    // Fetching the user from DynamoDB
    const command = new GetCommand(params);
    const data = await ddbDocClient.send(command);

    // Checking if the user was found
    if (!data.Item) {
      return sendResponse(404, { message: "User not found" });
    }

    // Verifying the password
    if (data.Item.password === password) {
      // Sign a JWT token for the user
      const token = jwt.sign({ email: data.Item.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log("JWT token generated: ", token);

      return sendResponse(200, { message: "Login Successful", token });
    } else {
      return sendResponse(401, { message: "Password incorrect" });
    }
  } catch (err) {
    // Logging the error for debugging purposes
    console.error("Error: ", err);
    return sendResponse(500, { message: "Internal Server Error", error: err });
  }
};
