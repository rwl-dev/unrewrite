import { UnrewriteConfig } from "../../model.ts";

export const userConfig: Required<UnrewriteConfig> = {
  title: "Sample Test",
  titleTemplate: (title) => `${title} | ${userConfig.title}`,
  baseDir: "sample",
  baseNovelDir: "novels",
  icon: "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png",
  ogpImage: "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png",
  twitterUserName: "windchime_yk",
  overwriteCss: "",
};
export const partialUserConfig: UnrewriteConfig = {
  title: "Test Utils",
  titleTemplate: (title) => `${title} - ${partialUserConfig.title}`,
  baseDir: "sample",
};
