import { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { createJwtCookie } from "../_utils/cookie";
import { getUserByEmail } from "../_utils/api";

export default async (request: VercelRequest, response: VercelResponse) => {
  // Get email and password from request
  const { email, password } = request.body;

  if (!email || !password) {
    response.status(401).json("Email and password are required");
    return;
  }

  try {
    // Search DB for email and return if found - if not return error
    const user = await getUserByEmail(email);

    if (!user) {
      response.status(401).json("Invalid email or password");
      return;
    }
    // Compare password of found user and given password using bcrypt.compare
    const isCorrectPassword = await bcrypt.compare(password, user.passwordhash);

    // if ok, continue - if not return error
    if (!isCorrectPassword) {
      response.status(401).json("Invalid email or password");
      return;
    }

    response.setHeader("Set-Cookie", createJwtCookie(user));

    // return response with access Token & User
    response.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
