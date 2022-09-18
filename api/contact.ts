import type { VercelApiHandler } from "@vercel/node";

const handler: VercelApiHandler = (request, response) => {
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
};

export default handler;
