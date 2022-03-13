export interface UnrewriteConfig {
  /** Webサイトのタイトル */
  title: string;
  /** WebページのタイトルとWebサイトのタイトルの区切り文字 */
  titleSplitWord: string;
  /**
   * 参照する小説ディレクトリ
   * デフォルトは`Deno.cwd()`
   */
  baseDir?: string;
  baseNovelDir?: string;
  /** ファビコンに利用する画像パス */
  icon?: string;
  /** ファビコンに利用する画像パス */
  ogpImage?: string;
  /**
   * Twitterカードに利用されるTwitter名
   * アットマーク(@)は先頭に入れなくていい
   */
  twitterUserName?: string;
  /**
   * 上書きするCSSファイルパス
   * この設定を有効化することで既存のスタイルをすべて非適用にできる
   */
  overwriteCss?: string;
}

export type MimeType =
  | "text/plain"
  | "text/html"
  | "text/css"
  | "text/javascript"
  | "text/csv"
  | "image/jpeg"
  | "image/png"
  | "image/svg+xml";

export interface Meta {
  title: string;
  description: string;
}

export interface InnerHTMLHelperParams {
  tagName: string;
  html: string;
}

export interface HeadProps {
  meta: Meta;
  config: UnrewriteConfig;
}

export interface HeaderProps {
  config: UnrewriteConfig;
}

export interface BodyProps {
  config: UnrewriteConfig;
  content: string;
}
