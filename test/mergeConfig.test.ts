import { assertEquals } from "../deps.ts";
import type { UnrewriteConfig } from "../model.ts";
import { mergeConfig } from "../utils/mergeConfig.ts";
import defaultConfig from "../unrewrite.config.ts";
import { partialUserConfig } from "./common/util.ts";
import { userConfig } from "../utils/config.ts";

Deno.test(mergeConfig.name, () => {
  const config = mergeConfig(partialUserConfig);

  assertEquals<UnrewriteConfig>(config, {
    title: partialUserConfig.title,
    titleTemplate: partialUserConfig.titleTemplate,
    baseDir: partialUserConfig.baseDir,
    baseNovelDir: defaultConfig.baseNovelDir,
    icon: defaultConfig.icon,
    ogpImage: defaultConfig.ogpImage,
    twitterUserName: defaultConfig.twitterUserName,
    overwriteCss: defaultConfig.overwriteCss,
  });
});

Deno.test(`${mergeConfig.name} - userConfig`, async () => {
  const config = await userConfig;
  const mergedConfig = mergeConfig(config.default);

  assertEquals<UnrewriteConfig>(mergedConfig, {
    title: config.default.title,
    titleTemplate: config.default.titleTemplate,
    baseDir: config.default.baseDir,
    baseNovelDir: config.default.baseNovelDir,
    icon: config.default.icon,
    ogpImage: config.default.ogpImage,
    twitterUserName: config.default.twitterUserName,
    overwriteCss: config.default.overwriteCss,
  });
});
