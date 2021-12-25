import { assertEquals } from "../deps.ts";
import { allSettedConfig } from "./common/util.ts";
import { userConfig } from "../utils/config.ts";
import type { UnrewriteConfig } from "../model.ts";

Deno.test("get userConfig", () => {
  assertEquals<UnrewriteConfig>(userConfig, allSettedConfig);
});
