// External dependencies
import { ObjectId } from "mongodb";

//  Class Implementation
export default class Food {
  constructor(
    public _id: ObjectId,
    public name: string,
    public weight: number,
    public calories: number,
    public carbs: number,
    public protein: number,
    public fat: number,
    public fiber: number,
    public sugar: number
  ) {}
}
