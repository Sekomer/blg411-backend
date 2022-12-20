import express, { Request, Response, Router } from "express";
import { collections } from "../services/database.service";

import dotenv from "dotenv";
import FoodRepository from "../repositories/food";
import UserRepository from "../repositories/user";

import Food from "../models/food";

const foodRouter: Router = express.Router();

const result = dotenv.config({ path: ".env" });

// abort if .env file is not found
if (result.error) {
  console.error(".env file missing!");
  throw result.error;
}

foodRouter.get("/", async (req: Request, res: Response) => {
  if (!collections.foods) {
    return res.status(400).send("collection not found");
  }

  FoodRepository.getAllFood()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

foodRouter.get("/id/:id", async (req: Request, res: Response) => {
  if (!collections.foods) {
    return res.status(400).send("collection not found");
  }

  FoodRepository.getFoodById(req.params.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

foodRouter.get("/name/:name", async (req: Request, res: Response) => {
  if (!collections.foods) {
    return res.status(400).send("collection not found");
  }

  FoodRepository.getFoodByName(req.params.name)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

foodRouter.post("/", async (req: Request, res: Response) => {
  if (!collections.foods) {
    return res.status(400).send("collection not found");
  }

  const food = req.body as Food;

  FoodRepository.addFood(food)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

foodRouter.put("/:id", async (req: Request, res: Response) => {
  if (!collections.foods) {
    return res.status(400).send("collection not found");
  }

  const updates = req.body as Food;

  FoodRepository.updateFood(req.params.id, updates)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

foodRouter.delete("/:id", async (req: Request, res: Response) => {
  if (!collections.foods) {
    return res.status(400).send("collection not found");
  }

  FoodRepository.deleteFood(req.params.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// for dev purposes only
foodRouter.delete("/", async (req: Request, res: Response) => {
  if (!collections.foods) {
    return res.status(400).send("collection not found");
  }

  FoodRepository.deleteAllFood()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// don't use this in production && don't use if you don't know what you're doing
foodRouter.post("/query", async (req: Request, res: Response) => {
  if (!collections.foods) {
    return res.status(400).send("collection not found");
  }

  const query = req.body as object;

  FoodRepository.getFoodByQuery(query)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

foodRouter.post("/add2user/:username", async (req: Request, res: Response) => {
  if (!collections.foods) {
    return res.status(400).send("collection not found");
  }

  const foods = req.body.foods as Array<object>;

  UserRepository.addFoodsToUser(req.params.username, foods)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

foodRouter.post("/rem4user/:username", async (req: Request, res: Response) => {
  if (!collections.foods) {
    return res.status(400).send("collection not found");
  }

  const foods = req.body.removals as Array<string>;

  UserRepository.removeFoodsFromeUser(req.params.username, foods)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

foodRouter.get("/users_food/:username", async (req: Request, res: Response) => {
  if (!FoodRepository || !UserRepository) {
    return res.status(400).send("collection not found");
  }

  const username = req.params.username;

  UserRepository.getFoodsOfUser(username)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

foodRouter.get("/all-users", async (req: Request, res: Response) => {
  if (!FoodRepository || !UserRepository) {
    return res.status(400).send("collection not found");
  }

  UserRepository.getAllUsers()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

export default foodRouter;
