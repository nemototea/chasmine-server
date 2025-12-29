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
│   ├── Dockerfile     # 本番用
│   ├── Dockerfile.dev # 開発用
│   └── package.json
├── backend/           # NestJS バックエンドアプリケーション
│   ├── src/          # ソースコード
│   ├── test/         # テスト
│   ├── Dockerfile     # 本番用
│   ├── Dockerfile.dev # 開発用
│   └── package.json
└── docker-compose.yml # 開発用
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

### Docker Compose（開発環境）

Docker Composeを使用して開発環境を起動する場合（**ホットリロード対応**）:

```bash
docker compose up --build
```

- フロントエンド: http://localhost:3000
- バックエンド: http://localhost:3001

コードを変更すると自動的にリロードされます。

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

## デプロイ

### オプション1: コンテナサービス（Cloud Run, ECS, など）

本番用Dockerfileを使用してコンテナイメージをビルド・デプロイします。

#### フロントエンドのビルド

```bash
cd frontend
docker build -t chasmine-frontend:latest .
# Cloud Runなどにデプロイ
```

#### バックエンドのビルド

```bash
cd backend
docker build -t chasmine-backend:latest .
# Cloud Runなどにデプロイ
```

**環境変数の設定例（Cloud Run）**:
- Frontend:
  - `NODE_ENV=production`
  - `BACKEND_URL=https://your-backend-url.com`
- Backend:
  - `NODE_ENV=production`
  - `PORT=3001`

### オプション2: 従来のサーバーデプロイ（VPS、EC2など）

Dockerを使わず、Node.jsアプリとして直接デプロイします。

#### 1. 依存関係のインストールとビルド

```bash
# フロントエンド
cd frontend
npm ci --production=false
npm run build

# バックエンド
cd backend
npm ci --production=false
npm run build
```

#### 2. プロセスマネージャーで起動（例: PM2）

```bash
# PM2をインストール
npm install -g pm2

# バックエンド起動
cd backend
pm2 start dist/main.js --name chasmine-backend

# フロントエンド起動
cd frontend
pm2 start npm --name chasmine-frontend -- run start
```

#### 3. リバースプロキシの設定（例: Nginx）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # フロントエンド
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # バックエンドAPI
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**環境変数の設定**:
- `.env`ファイルを作成するか、システム環境変数に設定
- Frontend: `BACKEND_URL=https://your-domain.com/api`
- Backend: `PORT=3001`, `NODE_ENV=production`

