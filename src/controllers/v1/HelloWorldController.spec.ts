import {PlatformTest} from "@tsed/common";
import {HelloWorldController} from "./HelloWorldController";

describe("HelloWorldController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  describe("get()", () => {
    it("should return hello", () => {
      const controller = PlatformTest.get<HelloWorldController>(HelloWorldController);
      expect(controller.get()).toEqual("hello");
    });
  });
});