import { VercelRequest, VercelResponse } from "@vercel/node";
import { updateUser } from "../../_utils/api";
import { verifyCookie, clearCookie, createJwtCookie } from "../../_utils/cookie";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (!request.query || !request.query.id) {
    response.status(422).json("ID param not supplied");
  }

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

  if (!request.body || Object.keys(request.body).length === 0) {
    response.status(422).json("No params passed to update");
  }

  try {
    const user = await updateUser(Number(request.query.id), request.body);

    if (!user) {
      response.status(422).json("There has been an error, please try again.");
    }

    response.setHeader("Set-Cookie", createJwtCookie(user));

    response.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};
