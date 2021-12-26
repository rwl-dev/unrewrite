import { assertEquals } from "../deps.ts";
import { allSettedConfig, partialUserConfig } from "./common/util.ts";
import { defaultConfig, mergeConfig, userConfig } from "../utils/config.ts";
import type { UnrewriteConfig } from "../model.ts";

Deno.test("get userConfig", () => {
  assertEquals<UnrewriteConfig>(userConfig, allSettedConfig);
});

Deno.test("mergeConfig", () => {
  const config = mergeConfig(partialUserConfig);

  assertEquals<UnrewriteConfig>(config, {
    title: partialUserConfig.title,
    titleSplitWord: partialUserConfig.titleSplitWord,
    baseDir: partialUserConfig.baseDir,
    baseNovelDir: defaultConfig.baseNovelDir,
    icon: defaultConfig.icon,
    ogpImage: defaultConfig.ogpImage,
    twitterUserName: defaultConfig.twitterUserName,
    overwriteCss: defaultConfig.overwriteCss,
  });
});

Deno.test("mergeConfig - userConfig", () => {
  const config = mergeConfig(userConfig);

  assertEquals<UnrewriteConfig>(config, {
    title: userConfig.title,
    titleSplitWord: userConfig.titleSplitWord,
    baseDir: userConfig.baseDir,
    baseNovelDir: userConfig.baseNovelDir,
    icon: userConfig.icon,
    ogpImage: userConfig.ogpImage,
    twitterUserName: userConfig.twitterUserName,
    overwriteCss: userConfig.overwriteCss,
  });
});
