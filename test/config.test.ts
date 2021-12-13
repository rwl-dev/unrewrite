import { assertEquals } from "../deps.ts";
import { userConfig } from "../utils/config.ts";

const unrewriteConfig = import("../unrewrite.config.ts");

Deno.test("get userConfig", async () => {
  assertEquals(await userConfig, await unrewriteConfig);
});
