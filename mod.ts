import type { Handler } from "./deps.ts";
import { userConfig } from "./utils/config.ts";
import { getFrontData, novelDataList } from "./utils/getData.ts";
import { mergeConfig } from "./utils/mergeConfig.ts";
import {
  detectStylePath,
  generateNotFoundContents,
  renderHTML,
} from "./utils/render.ts";

const responseInit: ResponseInit = {
  headers: { "content-type": "text/html" },
};

/**
 * UnRewriteのハンドラー関数。
 * std/httpのserveモジュールに受け渡しすることで利用可能。
 * @param req リクエスト
 */
export const handler: Handler = async (req) => {
  const { pathname } = new URL(req.url);
  const mergedConfig = mergeConfig(await userConfig);

  if (pathname.startsWith("/style.css")) {
    // TODO: sample/assets/配下のCSSファイルを直に参照しているため、ここもユーザーインジェクションできるようにする
    const file = await Deno.readFile(detectStylePath(mergedConfig));
    return new Response(file, {
      headers: {
        "content-type": "text/css",
      },
    });
  }

  if (pathname === "/") {
    return new Response(
      renderHTML(
        (await getFrontData()).meta,
        mergedConfig,
        (await getFrontData()).content,
      ),
      responseInit,
    );
  }

  for (const novelData of novelDataList) {
    if (
      pathname.includes(novelData!.path)
    ) {
      return new Response(
        renderHTML(
          novelData!.meta,
          mergedConfig,
          novelData!.content,
        ),
        responseInit,
      );
    }
  }

  return new Response(
    renderHTML(
      {
        title: "404 Not Found",
        description: "このURLにコンテンツはありません",
      },
      mergedConfig,
      generateNotFoundContents(),
    ),
    responseInit,
  );
};
