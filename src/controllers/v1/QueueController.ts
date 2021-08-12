import {BodyParams, Controller, Get, PathParams, Post} from "@tsed/common";
import { Scan } from "dynamoose/dist/DocumentRetriever";
import SQSClient from "src/config/sqs";

@Controller("/sqs")
export class UserController {
  @Get("/send")
  async send() {
    const sqs = new SQSClient();
    sqs.send("handler", "method", "body", 5);
    return 201;
  }

}
