import jwt from "jsonwebtoken";
import cookie from "cookie";

const COOKIE_OPTIONS: cookie.CookieSerializeOptions = {
  secure: true,
  httpOnly: true,
  path: "/",
  sameSite: "none",
  domain: "",
};

export type CookieParams = {
  id: number;
  name: string;
  email: string;
};

export const createJwtCookie = (user: CookieParams): string => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10 days",
  });

  const jwtCookie = cookie.serialize("jwtvuelogin", accessToken, {
    ...COOKIE_OPTIONS,
  });

  return jwtCookie;
};

export const verifyCookie = (header: string | null): CookieParams | undefined => {
  console.log("header :>> ", header);
  if (!header) return;

  const cookies = cookie.parse(header);
  if (!cookies.jwtvuelogin) return;

  const payload = jwt.verify(cookies.jwtvuelogin, process.env.ACCESS_TOKEN_SECRET);
  if (!payload || typeof payload === "string") return;

  const { id, name, email } = payload;
  if (!id || !email) return;

  return {
    id,
    name,
    email,
  };
};

export const clearCookie = (): string => {
  const jwtCookie = cookie.serialize("jwtvuelogin", "deleted", {
    ...COOKIE_OPTIONS,
    expires: new Date("Thu, 01 Jan 1970 00:00:00 GMT"),
  });

  return jwtCookie;
};
