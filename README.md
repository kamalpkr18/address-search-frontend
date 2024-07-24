---

# 住所検索アプリケーション

このプロジェクトは、住所検索アプリケーションです。バックエンドはNode.jsとExpressで構築され、フロントエンドはReactで構築されています。住所データは`zenkoku.csv`ファイルから読み込まれ、検索機能が提供されます。

## 利用可能なスクリプト

プロジェクトディレクトリで以下のコマンドを実行できます。

### `npm start`

開発モードでアプリを実行します。\
ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

変更を加えるとページが再読み込みされます。\
コンソールにリンティングエラーが表示されることもあります。

### `npm test`

インタラクティブウォッチモードでテストランナーを起動します。\
詳細は [running tests](https://create-react-app.dev/docs/running-tests/) を参照してください。

### `npm run build`

アプリをプロダクション用に `build` フォルダにビルドします。\
Reactをプロダクションモードで正しくバンドルし、最良のパフォーマンスのためにビルドを最適化します。

ビルドはミニファイされ、ファイル名にはハッシュが含まれます。\
アプリはデプロイする準備ができています！

詳細は [deployment](https://create-react-app.dev/docs/deployment/) を参照してください。

### `npm run eject`

**注意: この操作は一方向です。一度 `eject` すると元に戻せません！**

ビルドツールや設定に満足できない場合、いつでも `eject` することができます。このコマンドはプロジェクトから単一のビルド依存関係を削除します。

代わりに、すべての設定ファイルと依存関係（webpack、Babel、ESLintなどのトランスティブ依存関係）をプロジェクトに直接コピーするため、完全に制御できるようになります。`eject` を除くすべてのコマンドは引き続き動作しますが、コピーされたスクリプトを指すようになります。この時点で完全に自己責任となります。

`eject` を使う必要はありません。管理された機能セットは中小規模のデプロイメントに適しており、この機能を使用する必要を感じることはありません。ただし、準備ができた時にカスタマイズすることができるのは便利です。

## プロジェクトのセットアップと実行手順

### 前提条件

- Node.js がインストールされていること（推奨バージョン: 14.x以上）
- npm がインストールされていること

### セットアップ手順

1. プロジェクトのリポジトリをクローンするか、提供されたZIPファイルを解凍します。
2. 依存関係をインストールします。

#### バックエンド

```bash
cd address-search-frontend/backend
npm install
```

#### フロントエンド

```bash
cd ../
npm install
```

### アプリケーションの起動

#### バックエンドの起動

```bash
cd backend
node index.js
```

以下のメッセージが表示されれば、サーバーは正しく起動しています。

```
Server running on port 5001
```

#### フロントエンドの起動

```bash
cd ../
npm start
```

ブラウザが自動的に開かれ、アプリケーションが表示されます。\
ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしても同様です。

### 使用方法

1. ブラウザでアプリケーションにアクセスします。
2. 検索バーに住所の一部を入力し、「検索」ボタンをクリックします。
3. 入力されたキーワードに基づいて住所が検索され、結果がリストとして表示されます。
4. 検索結果がない場合、「ヒットしませんでした」というメッセージが表示されます。

### 技術詳細

- **バックエンド**: Node.js, Express
- **フロントエンド**: React, Axios
- **データ**: zenkoku.csv (Shift_JISからUTF-8に変換)

### フォルダ構造

```
address-search-frontend/
├── backend/
│   ├── node_modules/
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── zenkoku.csv
├── node_modules/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

### 注意事項

- `zenkoku.csv` ファイルが `backend` ディレクトリに正しく配置されていることを確認してください。
- 依存関係のインストール中にエラーが発生した場合、Node.js および npm のバージョンを確認し、必要に応じてアップデートしてください。

---
