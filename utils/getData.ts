import { getFileList, resolve } from "../deps.ts";
import { Marked } from "./marked.ts";
import { mergeConfig } from "./mergeConfig.ts";
import defaultConfig, { userConfig } from "./config.ts";

export interface Meta {
  title: string;
  description: string;
}

const config = await userConfig;
const baseDir = mergeConfig(config.default).baseDir || defaultConfig.baseDir;
const baseNovelDir = mergeConfig(config.default).baseNovelDir ||
  defaultConfig.baseNovelDir;

const novelUrlList = await getFileList(
  resolve(
    Deno.cwd(),
    baseDir,
    baseNovelDir,
  ),
);

export const getFrontData = async () => {
  const decoder = new TextDecoder("utf-8");
  const markdown = decoder.decode(
    await Deno.readFile(
      `${
        resolve(
          Deno.cwd(),
          baseDir,
          "front.md",
        )
      }`,
    ),
  );
  const { meta, content } = Marked.parse(markdown);

  return {
    meta: meta as Meta,
    content,
  };
};

export const getStyleData = () => {};

// NOTE: Promise.allよりPromise.allSettedのほうがよいが、ファイル読み込みのためrejectedされることが少なそうということと、TypeScript実行時にvalueがないという警告が出るためPromise.allで実装する
/**
 * 小説データを全件取得する
 */
export const novelDataList = await Promise.all(
  novelUrlList.map(async (entry) => {
    if (entry.ext !== ".md") return;

    const decoder = new TextDecoder("utf-8");
    const markdown = decoder.decode(await Deno.readFile(entry.path));
    const { meta, content } = Marked.parse(markdown);
    const path = entry.path.match(/(?<=novels\/).*/)!.join("").replace(
      ".md",
      "",
    );

    return {
      meta: meta as Meta,
      content,
      path,
    };
  }),
);
