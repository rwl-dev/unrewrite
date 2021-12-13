import { assertEquals } from "../deps.ts";
import type { UnrewriteConfig } from "../model.ts";
import { mergeConfig } from "../utils/mergeConfig.ts";
import unrewriteConfig from "../unrewrite.config.ts";
import { partialUserConfig } from "./common/util.ts";
import { userConfig } from "../utils/config.ts";

Deno.test(mergeConfig.name, () => {
  const config = mergeConfig(partialUserConfig);
  assertEquals<UnrewriteConfig>(config, {
    title: partialUserConfig.title,
    titleTemplate: partialUserConfig.titleTemplate,
    baseDir: partialUserConfig.baseDir,
    baseNovelDir: unrewriteConfig.baseNovelDir,
    icon: unrewriteConfig.icon,
    ogpImage: unrewriteConfig.ogpImage,
    twitterUserName: unrewriteConfig.twitterUserName,
  });
});

Deno.test(`${mergeConfig.name} - userConfig`, async () => {
  const config = mergeConfig(await userConfig);
  const user = await userConfig;

  assertEquals<UnrewriteConfig>(config, {
    title: user.title,
    titleTemplate: user.titleTemplate,
    baseDir: user.baseDir,
    baseNovelDir: user.baseNovelDir,
    icon: user.icon,
    ogpImage: user.ogpImage,
    twitterUserName: user.twitterUserName,
  });
});
