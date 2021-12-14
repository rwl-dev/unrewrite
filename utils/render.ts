import { tag } from "../deps.ts";
import type { Tag, UnrewriteConfig } from "../model.ts";
import type { Meta } from "./getData.ts";

const h = tag as Tag;

/** 第一引数がundefinedの場合、第二引数のHTMLタグを表示しない */
const showTag = (key: string | undefined, tag: string): string =>
  `${key && tag}`;

const generateHeadTag = (meta: Meta, config: UnrewriteConfig): string => {
  return h(
    "head",
    h("meta", { charset: "UTF-8" }),
    h("title", config.titleTemplate(meta.title)),
    h("meta", { name: "description", content: meta.description }),
    h("link", { rel: "shortcut icon", href: config.icon ?? "" }),
    h("meta", { name: "generator", content: "UnRewrite" }),
    h("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1, user-scalable=no",
    }),
    h("meta", { property: "og:type", content: "website" }),
    h("meta", {
      property: "og:title",
      content: config.titleTemplate(meta.title),
    }),
    h("meta", { property: "og:description", content: meta.description }),
    h("meta", { property: "og:site_name", content: config.title }),
    showTag(
      config.ogpImage,
      h("meta", { property: "og:image", content: `${config.ogpImage}` }),
    ),
    h("meta", { property: "twitter:card", content: "summary" }),
    showTag(
      config.twitterUserName,
      h("meta", {
        property: "twitter:site",
        content: `@${config.twitterUserName}`,
      }),
    ),
    h("link", { rel: "stylesheet", href: "style.css" }),
  );
};

const generateHeaderTag = (config: UnrewriteConfig): string =>
  h("header", h("h1", config.title));

const generateBodyTag = (config: UnrewriteConfig, content: string): string => {
  return h(
    "body",
    generateHeaderTag(config),
    h("main", content),
  );
};

export const generateNotFoundContents = (): string =>
  h(
    "section",
    h("h2", "404 Not Found"),
    h("p", "このページにはコンテンツはありませんでした。TOPページに戻って探し直してください。"),
    h("a", { href: "/" }, "TOPページへ"),
  );

export const renderHTML = (
  meta: Meta,
  config: UnrewriteConfig,
  content: string,
): string => {
  const html = h(
    "html",
    generateHeadTag(meta, config),
    generateBodyTag(config, content),
  );
  return `<!DOCTYPE html>
  ${html}`;
};
