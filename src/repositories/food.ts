import { Collection, ObjectId } from "mongodb";
import Food from "../models/food";
import { collections } from "../services/database.service";

class FoodRepository {
  constructor(public db: Collection | undefined) {
    this.db = db;
  }

  async getAllFood() {
    if (!collections.foods) {
      return null;
    }

    return await collections.foods.find({}).toArray();
  }

  async getFoodById(id: string) {
    if (!collections.foods) {
      return null;
    }

    return await this.db?.findOne({ _id: new ObjectId(id) });
  }

  async getFoodByName(name: string) {
    if (!collections.foods) {
      return null;
    }

    return await this.db?.findOne({ name: name });
  }

  async addFood(food: Food) {
    if (!collections.foods) {
      return null;
    }

    return await collections.foods.insertOne(food);
  }

  async updateFood(id: string, food: Food) {
    if (!collections.foods) {
      return null;
    }

    return await collections.foods.updateOne(
      { _id: new ObjectId(id) },
      { $set: food }
    );
  }

  async deleteFood(id: string) {
    if (!collections.foods) {
      return null;
    }

    return await collections.foods.deleteOne({ _id: new ObjectId(id) });
  }

  // LMAO
  async deleteAllFood() {
    if (!collections.foods) {
      return null;
    }

    return await collections.foods.deleteMany({});
  }

  // custom queries, don't use if you don't know what you're doing
  async getFoodByQuery(query: any) {
    if (!collections.foods) {
      return null;
    }

    return await collections.foods.find(query).toArray();
  }
}

export default new FoodRepository(undefined);
