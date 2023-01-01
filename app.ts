import dotenv from "dotenv";
import express, { Express } from "express";

import { utilRouter } from "./src/routes/util.router";
import {
	connectToDatabase,
	collections,
} from "./src/services/database.service";

const result = dotenv.config({ path: ".env" });
const bodyParser = require("body-parser");

import cors from "cors";
import foodRouter from "./src/routes/food.router";
import authRouter from "./src/routes/authentication";
import { verifyToken } from "./src/middlewares/authentication.middleware";
import FoodRepository from "./src/repositories/food";
import UserRepository from "./src/repositories/user";

// abort if .env file is not found
if (result.error) {
	console.error(".env file missing!");
	throw result.error;
}

// Initializing environment variables
const PORT: string = process.env.PORT!;

const app: Express = express();

// configure the app to use bodyParser()
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(bodyParser.json());

// cors settings
app.use(
	cors({
		origin: "*",
	})
);

/** database connection and middleware setup */
connectToDatabase()
	.then(() => {
		UserRepository.db = collections.users;
		FoodRepository.db = collections.foods;

		// adding middlewares
		app.use("/", authRouter);
		app.use(verifyToken);
		app.use("/", utilRouter);
		app.use("/foods", foodRouter);

		app.listen(PORT, () => {
			console.log(`Server started at http://localhost:${PORT}`);
		});
	})
	.catch((error: Error) => {
		console.error("Database connection failed", error);
		process.exit();
	});

export default app;
