import type { UnrewriteConfig } from "../model.ts";
import defaultConfig from "./config.ts";

export const mergeConfig = (userConfig: UnrewriteConfig): UnrewriteConfig => ({
  ...defaultConfig,
  ...userConfig,
});
