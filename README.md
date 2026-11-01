# 神顕現計画（非公式ファンサイト）

『ふつうの軽音部』の公式アカウントが投稿した、遊び心のある呼びかけ [＃神顕現計画](https://x.com/FutsunoKeionbu/status/2116546738093707716) に、ファンが応えた静的サイトです。

**公式サイトではありません。** 公式アカウント、原作者、出版社、そのほか権利者とは無関係です。なりすましでも、制作依頼を受けた仕事でもありません。

## 公開（GitHub Pages）

いまの公開先は GitHub Pages です。

https://kubot64.github.io/Kami-kengen/

| 項目 | 値 |
| --- | --- |
| Source | Deploy from a branch |
| Branch | `main` |
| Folder | `/`（root） |

ビルドは不要です。`main` のリポジトリ直下にある `index.html` が、そのまま公開されます。GitHub の Settings → Pages で、上の表のとおりブランチ `main` とフォルダ `/ (root)` を選んでください。

## Cloudflare Pages（別の置き場所）

同じファイルを Cloudflare Pages でも配信できます。ビルドは同じく不要です。

| 項目 | 値 |
| --- | --- |
| フレームワークプリセット | None |
| ビルドコマンド | 空欄のまま（何も書かない） |
| ビルド出力ディレクトリ | `/` |
| ルートディレクトリ | `/`（未入力でも、リポジトリ直下なら同じ） |
| 環境変数 | 不要 |

手順:

1. Cloudflare Pages で「Git に接続」し、このリポジトリを選ぶ。
2. プロダクションブランチは `main`。
3. 上の表のとおり、ビルドコマンドを空にし、出力ディレクトリを `/` にする。
4. 保存してデプロイする。

Node のバージョン指定も、インストールも要りません。空のビルドコマンドにすると、Pages はビルドをスキップして、出力ディレクトリのファイルを公開します。公開先のドメインを変えたときは、下の OGP と投稿ボタンの URL も合わせてください。

## ファイル

```
index.html          ページ
css/style.css       見た目
js/main.js          画像の差し替え、祈る、投稿リンク
assets/emblem.svg   favicon と印
assets/og.png       OGP 画像（差し替え可）
assets/hato.png     はとちゃんの絵（最初は置いていない）
assets/fonts/       このページ用にサブセットした OFL フォント
```

ローカルで見るとき:

```bash
python3 -m http.server 4173
```

ブラウザで `http://127.0.0.1:4173/` を開きます。`file://` では祈りの保存や、一部の読み込みが制限されることがあります。

## はとちゃんの絵を置く

ヒーローは最初、このサイトのために描いた象徴図です。丸い鳩、光輪、ギター。公式のキャラクターデザインの模写ではありません。

自分の絵に差し替えるとき:

1. 透過 PNG を `assets/hato.png` として置く。
2. 縦長が向いています。一辺 1600px 以上が目安です。背景は透明にしてください。
3. コミットしてプッシュすると、象徴図の代わりにその画像が画面いっぱいに出ます。ファイルが無いあいだは、象徴図のままです。絵を置くまでは `assets/hato.png` の 404 がログに出ますが、表示は壊れません。

公式のアニメ・漫画の画像、スクリーンショット、公式グッズの写真は置かないでください。自分で描いた絵か、使う許可のある絵だけにしてください。

## OGP と投稿リンク

カード用の画像ファイルは `assets/og.png`（1200×630）です。X や LINE は相対パスをカードにしないので、`og:image` と `twitter:image` は絶対 URL を指しています。

https://kubot64.github.io/Kami-kengen/assets/og.png

ページ自身の URL は `og:url` と canonical で `https://kubot64.github.io/Kami-kengen/` です。投稿ボタンも、この URL を添えた文面で開きます。

画像を差し替えるときは `assets/og.png` を同じサイズで置き換えてください。公開先のドメインを変えるときは、`index.html` の `og:url`、`og:image`、`twitter:image`、canonical、投稿ボタンの `data-url` を新しい URL に合わせてください。投稿文は `data-text` です。載せる URL は `data-url` で、それが無いときは開いているページの URL を使います。

## フォント

見出しは [Shippori Mincho](https://fonts.google.com/specimen/Shippori+Mincho)、本文は [Zen Kaku Gothic New](https://fonts.google.com/specimen/Zen+Kaku+Gothic+New) です。どちらも SIL Open Font License 1.1。サブセットしたファイルとライセンス全文は `assets/fonts/` にあります。
