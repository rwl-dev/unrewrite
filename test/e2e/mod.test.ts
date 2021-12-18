/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { assertEquals, buildFor } from "../../deps.ts";

Deno.test("Go to 404 page", async () => {
  const sinco = await buildFor("chrome");
  const page = await sinco.goTo("https://unrewrite-sample.deno.dev/hogehoge");
  const pageTitle: string = await page.evaluate(() => {
    return document.querySelector("h2")?.innerText;
  });
  assertEquals(pageTitle, "404 Not Found");
  await sinco.done();
});
