import { Collection, ObjectId } from "mongodb";
import User from "../models/user";
import { collections } from "../services/database.service";

class UserRepository {
  constructor(public db: Collection | undefined) {
    this.db = db;
  }

  async getUserById(id: string) {
    if (!collections.users) {
      return null;
    }

    return await this.db!.findOne({ _id: new ObjectId(id) });
  }

  async updateOne(filter: object, update: object) {
    if (!collections.users) {
      return null;
    }

    return await this.db!.updateOne(filter, update);
  }

  async findByUserName(username: string) {
    if (!collections.users) {
      return null;
    }

    return await this.db!.findOne({
      username: username,
    });
  }

  async insertOne(user: User) {
    if (!this.db) {
      return null;
    }

    return await this.db.insertOne(user);
  }

  async addFoodsToUser(username: string, foods: Array<object>) {
    if (!this.db) {
      console.log("No db");
      return null;
    }

    const user = await this.findByUserName(username);

    if (!user) {
      console.log("User not found");
      return null;
    }

    // merge two lists
    const update = foods.concat(user.items);

    return await this.db.updateOne(
      { username: username },
      { $set: { items: update } }
    );
  }

  async removeFoodsFromeUser(username: string, foodNames: Array<string>) {
    if (!this.db) {
      return null;
    }

    const user = await this.findByUserName(username);

    if (!user) {
      console.log("User not found");
      return null;
    }

    return await this.db.updateOne(
      { username: username },
      { $pull: { items: { name: { $in: foodNames } } } }
    );
  }

  async getFoodsOfUser(username: string) {
    if (!this.db) {
      return null;
    }

    const user = await this.findByUserName(username);

    if (!user) {
      console.log("User not found");
      return null;
    }

    const result = user.items.length > 0 ? user.items : [];

    return result;
  }

  async getAllUsers() {
    if (!this.db) {
      return null;
    }

    const users = await this.db.find({}).toArray();

    if (!users) {
      console.log("Users not found");
      return null;
    }

    // return height weight username age sex of all users
      return users.map((user) => {
      return {
        username: user.username,
        age: user.age,
        height: user.height,
        weight: user.weight,
        sex: user.sex,
      };
    });

  }
}

export default new UserRepository(undefined);
