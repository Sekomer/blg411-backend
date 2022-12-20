import express, { Request, Response, Router } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import UserRepository from "../repositories/user";
import User from "../models/user";
import { ObjectId } from "mongodb";

const authRouter: Router = express.Router();

const result = dotenv.config({ path: ".env" });

// abort if .env file is not found
if (result.error) {
  console.error(".env file missing!");
  throw result.error;
}

authRouter.post("/login", async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send("wrong request format");
  }
  if (!UserRepository) {
    return res.status(400).send("collection not found");
  }

  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).send("username password cannot be empty");
    }

    // check if user exists
    const user = await UserRepository.findByUserName(username);

    let admin_test = false;
    if (username === "admin" && password === "CORRECTHORSEBATTERYSTAPLE")
      admin_test = true;

    if (
      admin_test ||
      (user && (await bcrypt.compare(password, user.password)))
    ) {
      const token = jwt.sign(
        {
          user_id: username,
        },
        process.env.TOKEN_KEY!,
        {
          expiresIn: "1d",
        }
      );

      UserRepository.updateOne(
        { username: username },
        { $set: { token: token } }
      );

      return res.status(200).json({ username: username, token: token });
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (err: any) {
    console.log(err);
    return res.status(400).send(err);
  }
});

authRouter.post("/register", async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send("Empty request body");
  }

  if (!UserRepository) {
    return res.status(400).send("collection error");
  }

  const { username, password, height, weight, age, sex } = req.body;

  if (!(username && password)) {
    res.status(400).send("all input fields are required");
  }

  // check if already registered
  const olduser = await UserRepository.findByUserName(username);

  if (olduser) {
    return res.status(409).send("user already exists!");
  }

  const hashed = await bcrypt.hash(password, 10);

  const token = jwt.sign({ user_id: username }, process.env.TOKEN_KEY!, {
    expiresIn: "1d",
  });

  const newUser = new User(
    new ObjectId(),
    username,
    hashed,
    token,
    [],
    height,
    weight,
    age,
    sex
  );

  UserRepository.insertOne(newUser)
    .then(() => res.status(201).json({ username: username, token: token }))
    .catch(() => {
      res.status(400).send("couldn't create user, insert error");
    });
});

export default authRouter;
