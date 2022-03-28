import { VercelRequest, VercelResponse } from "@vercel/node";
import { getUserByEmail } from "../_utils/api";
import { clearCookie, verifyCookie } from "../_utils/cookie";

export default async (request: VercelRequest, response: VercelResponse) => {
  const origin = request.headers.origin;
  const cookiePayload = verifyCookie(request.headers.cookie);

  if (!cookiePayload) {
    console.log("No cookie found");
    response.setHeader("Set-Cookie", clearCookie());

    response.status(401).json({
      body: { auth: false },
      origin,
    });

    return;
  }

  const user = await getUserByEmail(cookiePayload.email);

  if (!user) {
    response.setHeader("Set-Cookie", clearCookie());

    response.status(401).json({
      body: { auth: false },
      origin,
    });

    return;
  }

  response.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
};
