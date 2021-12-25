import { resolve } from "../deps.ts";
import type { UnrewriteConfig } from "../model.ts";

export const defaultConfig: Required<UnrewriteConfig> = {
  title: "UnRewrite",
  titleSplitWord: " | ",
  baseDir: ".",
  baseNovelDir: "novels",
  icon: "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png",
  ogpImage: "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png",
  twitterUserName: "windchime_yk",
  overwriteCss: "",
};

export const CONFIG_FILE_NAME = "unrewrite.config.json";

export const parseConfig = async (path: string): Promise<UnrewriteConfig> => {
  const decoder = new TextDecoder("utf-8");
  const config = decoder.decode(await Deno.readFile(path));
  return JSON.parse(config);
};

export const userConfig = await parseConfig(
  resolve(Deno.cwd(), CONFIG_FILE_NAME),
);

export const mergeConfig = (userConfig: UnrewriteConfig): UnrewriteConfig => ({
  ...defaultConfig,
  ...userConfig,
});
