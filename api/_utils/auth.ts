import { VercelRequest } from "@vercel/node";

export const getAuthTokenFromHeader = (request: VercelRequest): string => {
  if (!request.headers["authorization"] || !request.headers["authorization"].startsWith("Bearer ")) {
    return;
  }

  const authHeader = request.headers["authorization"];
  return authHeader && authHeader.split(" ")[1];
};
