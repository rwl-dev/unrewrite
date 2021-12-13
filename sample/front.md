---
description: 'Deno novel hosting module(WIP)'
---

# UnRewrite
このモジュールは、個人向けセルフホスティング型小説投稿モジュールです。名前はアンモナイトが基で、そこから小説に関係ありそうな単語に変えたものになります。書き直す手間を最大限に減らすことを目標としています。  
小説データは`baseDir`で定義されたMarkdownファイルから取得され、TOPページのみ`baseDir`外の`front.md`に記述する必要があります。

## デプロイ先
Deno Deployを想定しています。

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
以下にも記載しますが、最新ではない場合があります。最新は`model.ts`の`UnrewriteConfig`を確認してください。

### title
Webサイトのタイトル。設定必須。  
デフォルトは`UnRewrite`

### titleTemplate
各ページで表示されるタイトル。設定必須。  
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
デフォルトは`windchime_yk`

## Frontmatter
Markdownファイル内の先頭に記載された、ページ固有の情報のことです。  
現状、サポートしているFrontmatterは以下。

- title：ページのタイトルを指定します。記載必須
- description：ページの説明を指定します。記載必須
- series：小説のシリーズ。記載自由。
- tags：
