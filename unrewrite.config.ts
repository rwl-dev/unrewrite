import type { UnrewriteConfig } from "./model.ts";

export const config: UnrewriteConfig = {
  title: "UnRewrite",
  titleTemplate: (title) => title ? `${title} | ${config.title}` : config.title,
  baseDir: "sample",
  baseNovelDir: "novels",
  icon: "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png",
  ogpImage: "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png",
  twitterUserName: "windchime_yk",
  overwriteCss: "",
};
