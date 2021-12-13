import { assertEquals } from "../deps.ts";
import { renderHTML } from "../utils/render.ts";
import { userConfig } from "./common/util.ts";

Deno.test(renderHTML.name, () => {
  const render = renderHTML(
    {
      title: "Test",
      description: "Test Page",
    },
    userConfig,
    "テスト",
  );
  assertEquals<string>(
    render,
    `<!DOCTYPE html>
  <html><head><meta charset="UTF-8"><title>Test</title><meta name="description" content="Test Page"><link rel="shortcut icon" href="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png"><meta name="generator" content="UnRewrite"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"><meta property="og:type" content="website"><meta property="og:title" content="Test | Sample Test"><meta property="og:description" content="Test Page"><meta property="og:site_name" content="Sample Test"><meta property="twitter:card" content="summary"><meta property="twitter:site" content="@windchime_yk"><style rel="stylesheet" href=""></style></head><body><main>テスト</main></body></html>`,
  );
});
