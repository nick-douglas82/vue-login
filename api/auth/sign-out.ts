import { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { clearCookie, createJwtCookie } from "../_utils/cookie";
import { getUserByEmail } from "../_utils/api";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    response.setHeader("Set-Cookie", clearCookie());

    // return response with access Token & User
    response.status(200).json("You have been signed out.");
  } catch (error) {
    console.log(error);
  }
};
