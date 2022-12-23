/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, html, resolve } from "../deps.ts";
import type {
  BodyProps,
  HeaderProps,
  InnerHTMLHelperParams,
  Meta,
  UnrewriteConfig,
} from "../model.ts";

const InnerHTMLHelper = ({ tagName, html }: InnerHTMLHelperParams) =>
  h(tagName, { dangerouslySetInnerHTML: { __html: html } });

export const detectStylePath = (config: UnrewriteConfig) =>
  config.overwriteCss
    ? resolve(Deno.cwd(), config.overwriteCss)
    : "./assets/style.css";

export const NotFoundContents = html({
  title: "404 Not Found",
  meta: {
    description: "このURLにコンテンツはありません",
  },
  body: (
    <section>
      <h2>404 Not Found</h2>
      <p>
        このページにはコンテンツはありませんでした。TOPページに戻って探し直してください。
      </p>
      <a href="/">TOPページへ</a>
    </section>
  ),
});

const titleTemplate = (
  { pageTitle, splitWord, siteName }: {
    pageTitle: string;
    splitWord: string;
    siteName: string;
  },
) => pageTitle ? `${pageTitle}${splitWord}${siteName}` : `${siteName}`;

const Header = ({ config }: HeaderProps) => (
  <header>
    <h1>{config.title}</h1>
  </header>
);

const Body = ({ config, content }: BodyProps) => (
  <>
    <Header config={config} />
    <InnerHTMLHelper tagName="main" html={content} />
  </>
);

export const renderHTML = (
  meta: Meta,
  config: UnrewriteConfig,
  content: string,
): Promise<Response> => {
  const title = titleTemplate({
    pageTitle: meta.title,
    splitWord: config.titleSplitWord,
    siteName: config.title,
  });

  return html({
    title,
    lang: "ja",
    meta: {
      description: meta.description,
      generator: "UnRewrite",
      viewport: "width=device-width, initial-scale=1.0",
      "og:type": "website",
      "og:title": title,
      "og:description": meta.description,
      "og:site_name": config.title,
      "og:image": config.ogpImage,
      "twitter:card": "summary",
      "twitter:site": config.twitterUserName && `@${config.twitterUserName}`,
    },
    links: [
      {
        "rel": "shortcut icon",
        "href": config.icon || "",
      },
      {
        "rel": "stylesheet",
        "href": "/style.css",
      },
    ],
    body: (
      <html>
        <Body config={config} content={content} />
      </html>
    ),
  });
};
