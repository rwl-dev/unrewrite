/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { assertEquals, assertStringIncludes, buildFor } from "../../deps.ts";
import type { Browsers } from "../../deps.ts";

const launchSinco = async (
  { browser = "chrome", url }: { browser?: Browsers; url: string },
) => {
  const sinco = await buildFor(browser);
  const page = await sinco.goTo(url);

  return { sinco, page };
};

const BASE_URL = "https://unrewrite-sample.deno.dev"

Deno.test("Go to 404 page", async () => {
  const { sinco, page } = await launchSinco({
    url: `${BASE_URL}/hogehoge"`,
  });
  const pageTitle: string = await page.evaluate(() => {
    return document.querySelector("h2")?.innerText;
  });
  assertEquals(pageTitle, "404 Not Found");
  await sinco.done();
});

Deno.test("Go to jpg url",async () => {
  const JPG_PATH = "images/jpgsample.jpg"
  const { sinco, page } = await launchSinco({
    url: `${BASE_URL}/${JPG_PATH}`,
  });
  const imgSrc: string = await page.evaluate(() => {
    return document.querySelector("img")?.src
  });
  assertStringIncludes(imgSrc, JPG_PATH);
  await sinco.done();
})

Deno.test("Go to png url",async () => {
  const PNG_PATH = "images/pngsample.png"
  const { sinco, page } = await launchSinco({
    url: `${BASE_URL}/${PNG_PATH}`,
  });
  const imgSrc: string = await page.evaluate(() => {
    return document.querySelector("img")?.src
  });
  assertStringIncludes(imgSrc, PNG_PATH);
  await sinco.done();
})

Deno.test("Go to svg url",async () => {
  const { sinco, page } = await launchSinco({
    url: `${BASE_URL}/images/svgsample.svg`,
  });
  const svgId: string = await page.evaluate(() => {
    return document.querySelector("rect")?.id
  });
  assertEquals(svgId, "アートボード1");
  await sinco.done();
})
