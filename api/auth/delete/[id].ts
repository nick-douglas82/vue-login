import { VercelRequest, VercelResponse } from "@vercel/node";
import { deleteUser } from "../../_utils/api";
import { clearCookie, verifyCookie } from "../../_utils/cookie";

export default async (request: VercelRequest, response: VercelResponse) => {
  // Get email from request
  const { id } = request.query;

  if (!request.query || !id) {
    response.status(422).json("ID param not supplied");
  }

  try {
    const origin = request.headers.origin;
    const cookiePayload = verifyCookie(request.headers.cookie);

    if (!cookiePayload) {
      response.setHeader("Set-Cookie", clearCookie());

      response.status(401).json({
        body: { auth: false },
        origin,
      });

      return;
    }

    await deleteUser(Number(id));
    response.status(200).json("Account removed");
  } catch (error) {
    console.log(error);
  }
};
