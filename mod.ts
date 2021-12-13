import type { Handler } from "./deps.ts";
import { userConfig } from "./utils/config.ts";
import { getFrontData, novelDataList } from "./utils/getData.ts";
import { mergeConfig } from "./utils/mergeConfig.ts";
import { generateNotFoundContents, renderHTML } from "./utils/render.ts";

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

  console.log(pathname);

  if (pathname.startsWith("/style.css")) {
    console.log("response");

    /** これはDeno Deploy上でしか確認できない */
    const file = await Deno.readFile("./sample/assets/style.css");
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
        mergeConfig(await userConfig),
        (await getFrontData()).content,
      ),
      responseInit,
    );
  }

  for (const novelData of novelDataList) {
    // const novelPattern = new URLPattern({ pathname: '/novels' })
    // 遷移条件：URLがルートだった場合、frontを表示
    // 遷移条件：URLがnovel/配下かつnew URL(req.url).pathnameがnovelData.pathに合致する場合、該当のmarkdownデータを出す
    // 遷移条件：それ以外の場合、404ページに遷移
    if (
      pathname.includes(novelData!.path)
    ) {
      return new Response(req.url);
    }
  }

  return new Response(
    renderHTML(
      {
        title: "404 Not Found",
        description: "このURLにコンテンツはありません",
      },
      mergeConfig(await userConfig),
      generateNotFoundContents(),
    ),
    responseInit,
  );
};
