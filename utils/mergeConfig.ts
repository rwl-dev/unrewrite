import type { UnrewriteConfig } from "../model.ts";
// import unrewriteConfig from "./config.ts";
import unrewriteConfig from "../unrewrite.config.ts";

// TODO: 同じファイルを読み込んでおり、マージの意味がなくなっている上、デフォルト設定を読み込むとエラーになるので修正の必要あり
export const mergeConfig = (userConfig: UnrewriteConfig): UnrewriteConfig => ({
  ...unrewriteConfig,
  ...userConfig,
});
