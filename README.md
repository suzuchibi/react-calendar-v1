# Google風タイムテーブルカレンダー
React + Redux(+ Redux-saga) + TypescriptでGoogle風タイムテーブルカレンダーを実装。  
  
デモは[こちら](https://cal1.t-suzu.com/)  

## 概要
Google風なタイムテーブルカレンダーをReact、Redux + Redux-sagaで実装。祝日はGoogleCalendarAPIから取得。CSSフレームワークは Material UI を使用。

![demo](/doc/demo.png)

↓デモ動画  
![sample](/doc/original.gif)

## 開発環境
- node.js 14.17.4 (安定板)
- yarn 1.22+
- react 17.0.1
- redux 7.2.2
- typescript 4.0.3

## 対応ブラウザ
- ○ Google Chrome 最新版
- △ Fire Fox 最新版
- △ Safari 最新版
- ○ Microsoft Edge 最新版  

フォームの日付ピッカー（ネイティブピッカー）は Material UI の仕様のため、ChromeとEdgeのみ対応。

## 実行方法
リポジトリをクローンまたはダウンロードしてきたら、パッケージインストール。
```
$ yarn install
```
yarnから開発モード実行。
```
$ yarn start
```

## 注意事項
リポジトリをクローンまたは、ダウンロードした段階では、GoogleAPIの「APIキー」は設定されてないので、**祝日は表示されません。祝日が表示されないだけで、それ以外は実行できます。**  
祝日を表示させたい場合は、あなたのGoogleアカウントでGoogleカレンダーの「APIキー」を取得してください。  
（Googleアカウントは祝日の取得のみに利用しています。）

![screen3](/doc/screen3.png)

### API KEY 取得方法
Google Calendar API に自身のアカウントでログインしてください。
![screen](/doc/screen1.png)

1をクリックして、新しいCloud Platformプロジェクトを作成し、Google CalendarAPIを自動的に有効にします。ダイアログに表示されるクライアントIDをメモします。

2をクリックして、同じプロジェクトにAPIキーを作成します。ダイアログに表示されるAPIキーをメモします。

以下「APIキー」表示例
![screen2](/doc/screen2.png)
  
メモした「APIキー」をファイルに追記します。これによりGoogle Carendar API から「日本の祝日」を取得します。  
```
[./env.example]
REACT_APP_G_CALENDAR_API_KEY= <-- API KEY を追加してください。
```

次に「env.example」ファイルを「.env」にリネームしてください。
```
[Tarminal]
mv env.example .env
```

## Author
Author Toru Suzuki
