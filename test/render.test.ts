import { assertEquals } from "../deps.ts";
import { renderHTML } from "../utils/render.tsx";
import { allSettedConfig } from "./common/util.ts";

const responseBody = async (response: Response) => {
  const body = (await response.body?.getReader().read())?.value;
  const decoder = new TextDecoder();
  return decoder.decode(body);
};

Deno.test("renderHTML", async () => {
  const render = await renderHTML(
    {
      title: "Test",
      description: "Test Page",
    },
    allSettedConfig,
    "テスト",
  );

  assertEquals<string>(
    await responseBody(render),
    `<!DOCTYPE html><html lang="ja"><head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Test | UnRewrite</title><meta name="description" content="Test Page" /><meta name="generator" content="UnRewrite" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta property="og:type" content="website" /><meta property="og:title" content="Test | UnRewrite" /><meta property="og:description" content="Test Page" /><meta property="og:site_name" content="UnRewrite" /><meta property="og:image" content="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png" /><meta name="twitter:card" content="summary" /><meta name="twitter:site" content="@windchime_yk" /><link rel="shortcut icon" href="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png" /><link rel="stylesheet" href="/style.css" /></head><body><html><header><h1>UnRewrite</h1></header><main>テスト</main></html></body></html>`,
  );
});
