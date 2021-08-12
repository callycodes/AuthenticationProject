import {BodyParams, Controller, Get, PathParams, Post} from "@tsed/common";
import { Scan } from "dynamoose/dist/DocumentRetriever";
import { User, UserModel } from "src/models/User";

@Controller("/user")
export class UserController {
  @Get("/")
  async getAll() {
    //TODO
    const users = await UserModel.scan().exec();
    return users.toJSON();
  }

  @Get("/:id")
  async getUser(@PathParams("id") id: string): Promise<User> {
    const user = await UserModel.get(id);
    return user || false;
  }

  @Post()
  async createUser(@BodyParams() payload: any) {
    const user = new UserModel(payload);
    try {
    await user.save();
    } catch (error) {
      console.log(error)
      return false;
    }
    return true;
  }

}
