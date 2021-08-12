import {PlatformTest} from "@tsed/common";
import { UserModel } from "src/models/User";
import {UserController} from "./UserController";
import {Server} from "src/Server";

describe("UserController", () => {

  beforeEach(PlatformTest.bootstrap(Server));
  afterEach(PlatformTest.reset);

  describe("getAllUsers", () => {
    it("should get all users", async () => {
      const controller = PlatformTest.get<UserController>(UserController);
      const users = await controller.getAll();
      expect(users.length).toBeGreaterThanOrEqual(0)
    });
  });

  describe("getUser", () => {
    it("should get a user by id", async () => {
      const controller = PlatformTest.get<UserController>(UserController);
      const id = "testid";
      const user = await controller.getUser(id);
      expect(user.id).toBe(id);
    });
  });

  describe("createUser", () => {
    it("should create a user with payload", async () => {
      const controller = PlatformTest.get<UserController>(UserController);

      const data = {
        id: "test_user_id",
        name: "test_user_name"
      };

      await controller.createUser(data);
      const user = await UserModel.get(data.id);

      expect(user.name).toBe(data.name);

      await UserModel.delete(user.id);
      
    });
  });
});