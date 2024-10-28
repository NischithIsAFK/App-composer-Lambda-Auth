export const handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "This is the home page",
    }),
  };

  return response;
};
