# chasmine-server

Cha'sMineのWebフロントエンド・バックエンド

## 技術スタック

- **フロントエンド**: [Remix](https://remix.run/) with TypeScript
- **バックエンド**: [NestJS](https://nestjs.com/) with TypeScript
- **コンテナ**: Docker & Docker Compose

## プロジェクト構成

```
chasmine-server/
├── frontend/          # Remix フロントエンドアプリケーション
│   ├── app/          # Remix アプリディレクトリ
│   │   ├── routes/   # ルートコンポーネント
│   │   └── root.tsx  # ルートコンポーネント
│   ├── Dockerfile
│   └── package.json
├── backend/           # NestJS バックエンドアプリケーション
│   ├── src/          # ソースコード
│   ├── test/         # テスト
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## はじめに

### 必要な環境

- Node.js >= 20.0.0
- Docker & Docker Compose

### 開発

#### フロントエンド (Remix)

```bash
cd frontend
npm install
npm run dev
```

フロントエンドは http://localhost:3000 でアクセスできます

#### バックエンド (NestJS)

```bash
cd backend
npm install
npm run start:dev
```

バックエンドは http://localhost:3001 でアクセスできます

### Docker Compose

Docker Composeを使用してアプリケーション全体を実行する場合:

```bash
docker compose up --build
```

- フロントエンド: http://localhost:3000
- バックエンド: http://localhost:3001

アプリケーションを停止する場合:

```bash
docker compose down
```

## スクリプト

### フロントエンド

- `npm run dev` - 開発サーバーを起動
- `npm run build` - プロダクション用にビルド
- `npm run start` - プロダクションサーバーを起動
- `npm run lint` - ESLintを実行
- `npm run typecheck` - TypeScript型チェックを実行

### バックエンド

- `npm run start:dev` - ウォッチモードで開発サーバーを起動
- `npm run build` - プロダクション用にビルド
- `npm run start:prod` - プロダクションサーバーを起動
- `npm run lint` - ESLintを実行
- `npm run test` - ユニットテストを実行
- `npm run test:e2e` - E2Eテストを実行

