import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public _id: ObjectId,
    public username: string,
    public password: string,
    public token: string,
    public items: Array<object>
  ) {}
}
