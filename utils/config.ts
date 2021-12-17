import { resolve } from "../deps.ts";
import type { UnrewriteConfig } from "../model.ts";

const defaultConfig: Required<UnrewriteConfig> = {
  title: "UnRewrite",
  titleTemplate: (meta) =>
    meta ? `${meta} | ${defaultConfig.title}` : defaultConfig.title,
  baseDir: ".",
  baseNovelDir: "novels",
  icon: "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png",
  ogpImage: "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png",
  twitterUserName: "windchime_yk",
  overwriteCss: "",
};

export const userConfig: Promise<UnrewriteConfig> = import(
  resolve(Deno.cwd(), "unrewrite.config.ts")
);

export default defaultConfig;
