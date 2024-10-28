import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const handler = async (event) => {
  try {
    const token = event.authorizationToken;

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);

    return {
      principalId: decoded.email,
      policyDocument: generatePolicyDocument("Allow", event.methodArn),
      context: {
        email: decoded.email,
      },
    };
  } catch (err) {
    console.error("Token verification failed:", err);
    throw new Error("Unauthorized");
  }
};

// Reusable function to generate the policy document
function generatePolicyDocument(effect, methodArn) {
  if (!effect || !methodArn) return null;

  return {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: methodArn,
      },
    ],
  };
}
