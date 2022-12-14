import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { NextFunction, Request, Response } from "express";

const result = dotenv.config({ path: ".env" });

// abort if .env file is not found
if (result.error) {
  console.error(".env file missing!");
  throw result.error;
}

// middleware that provides authentication by verifying the jwt token
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body) return res.status(400).send("empty request body!");

  const authHeader = String(req.headers["authorization"] || "");

  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7, authHeader.length);

    try {
      // verify jwt token and get username
      const decoded = jwt.verify(token, process.env.TOKEN_KEY!);

      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  } else return res.status(403).send("A token is required for authentication");

  return next();
};
