---
description: 'Deno novel hosting module(WIP)'
---

このモジュールは、個人向け小説投稿サイト構築モジュールです。  
名前はアンモナイトに由来し、それを小説に関係ありそうなワードに書き換えたものになります。

[Deno Deploy](https://deno.com/deploy)を利用してWeb上に公開することを想定しており、`novels`フォルダにMarkdownファイルを配置することで小説を更新できます。  
また、TOPページは`front.md`というMarkdownファイルに文言を追加することで更新可能です。

## このモジュールのターゲット
- Denoで小説投稿をしてみたい人
- 自分用の小説投稿サイトがほしくて、ちょっとプログラミングも触れる人
- プログラミングはできないけど、手順書を読みながらでも自分用の小説投稿サイトがほしい人

## 手順書
正式版リリース後に追加します。

## 想定されるディレクトリ構造
`unrewrite init`で生成されるようになる予定です。
``` zsh
.
├── novels
│   ├── front.md
│   └── wagahaihanekodearu
│       └── 01.md
└── server.ts
```

## ユーザー設定
`unrewrite.config.ts`でユーザー設定を定義し、設定変更が可能です。

``` typescript
import type { UnrewriteConfig } from "https://deno.land/x/unrewrite@x.x.x/model.ts";

const config: UnrewriteConfig = {
  title: "UnRewrite",
  titleTemplate: (title) => title ? `${title} | ${config.title}` : config.title,
  baseDir: "sample",
  baseNovelDir: "novels",
  icon: "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png",
  ogpImage: "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png",
  twitterUserName: "windchime_yk",
  overwriteCss: "",
};

export default config
```

上記が設定値のテンプレとなっています。

### title
Webサイトのタイトル。設定必須。  
デフォルトは`UnRewrite`

### titleTemplate
各ページで表示されるタイトル。`front.md`以外では設定必須。  
デフォルトは`(ページタイトル) => ページタイトル | UnRewrite`。

### baseDir
front.mdや小説データのディレクトリが配置されるディレクトリ名。設定任意。  
デフォルトは現在作業中のディレクトリルート。

### baseNovelDir
小説データを配置するディレクトリ名。設定任意。  
デフォルトは`novels`。

### icon
ブラウザのタブに表示される小さなアイコンのファイル名。設定任意。  
デフォルトは`https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png`。

### ogpImage
Twitterなどでリンク内の情報をわかりやすくするOGPという仕組みで利用される画像。設定任意。  
小さく画像が表示されるタイプのOGPなので、正方形の画像が望ましい。  
デフォルトは`https://twemoji.maxcdn.com/v/13.1.0/72x72/1f995.png`。

### twitterUserName
OGPに設定される利用者のTwitter名。設定任意。  
デフォルトはなし

## Frontmatter
Markdownファイル内の先頭に記載された、ページ固有の情報のことです。  
現状、サポートしているFrontmatterは以下。

- title：ページのタイトルを指定します。`front.md`以外では記載必須
- description：ページの説明を指定します。記載必須
- author：著者名。記載任意
- series：小説のシリーズ。記載任意

## 画像表示
`![jpgイメージのサンプル](/images/jpgsample.jpg)`のように書くことで画像を表示することができます。  
`![画像の説明](画像のパス)`という構成となっており、画像のパスは`/images/ユーザーが追加した画像の名前`となるようにしてください。  
現在はjpgとpng、svgをサポートしています。
![jpgイメージのサンプル](/images/jpgsample.jpg)
