# Google風タイムテーブルカレンダー
React.js Rudex TypescriptでGoogle風タイムテーブルカレンダーを試作。  

## 概要
Google風なタイムテーブルカレンダーをReact、Reduxで試作。祝日はGoogleCalendarAPIから取得。CSSフレームワークは Material UI を使用。

![demo](/uploads/55077b22ecd98686b778b9de161f3f8a/demo.png)

デモ動画
![sample](/uploads/9916ebd114df4da4152c27c707409da9/sample.mov)

## 開発環境
- node.js 14.2+
- yarn 1.22+
- react 17.0.1
- redux 7.2.2
- typescript 4.0.3

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

![screen3](/uploads/b5cd44db8d17f60b301c675cad8a636c/screen3.png)

### API KEY 取得方法
Google Calendar API に自身のアカウントでログインしてください。
![screen](/uploads/80fa2ad325452a3887f0b69aae7ffaba/screen.png)

1をクリックして、新しいCloud Platformプロジェクトを作成し、Google CalendarAPIを自動的に有効にします。ダイアログに表示されるクライアントIDをメモします。

2をクリックして、同じプロジェクトにAPIキーを作成します。ダイアログに表示されるAPIキーをメモします。

以下「APIキー」表示例
![screen2](/uploads/9b631b2df9f9355c5ab4bdf0b4db36ea/screen2.png)

メモした「APIキー」をファイルに追記します。これによりGoogle Carendar API から「日本の祝日」を取得します。  
src/config/app.json
```
{
  "drawerWidth": 260,
  "timeLineWidth": 60,
  "startOrder": 10,
  "lastOrder": 19,
  "dayOfTheWeek": ["日", "月", "火", "水", "木", "金", "土"],
  "gapiCal": {
    "key": "",  // <-- API Key を追加してください。
    "address": "ja.japanese#holiday@group.v.calendar.google.com",
    "gurl": "https://www.googleapis.com/calendar/v3/calendars/"
  }
}
```

## Author
Author Toru Suzuki

## License
Copyright © 2021, Toru Suzuki