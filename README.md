# chasmine-server

Cha'sMineのWebフロントエンド・バックエンド

## 技術スタック

- **フロントエンド**: [React Router v7](https://reactrouter.com/) with TypeScript
- **バックエンド**: [NestJS](https://nestjs.com/) with TypeScript
- **データベース**: MySQL 8.4
- **ORM**: [Prisma](https://www.prisma.io/) (推奨) / [Drizzle ORM](https://orm.drizzle.team/) / [TypeORM](https://typeorm.io/)
- **コンテナ**: Docker & Docker Compose

## プロジェクト構成

```
chasmine-server/
├── frontend/          # React Router v7 フロントエンドアプリケーション
│   ├── app/          # React Router アプリディレクトリ
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
├── .env.example       # 環境変数のサンプル
└── docker-compose.yml # 開発用（フロントエンド、バックエンド、MySQL）
```

## はじめに

### 必要な環境

- Node.js >= 24.0.0
- Docker & Docker Compose

### 環境変数のセットアップ

プロジェクトルートに `.env` ファイルを作成します：

```bash
cp .env.example .env
```

`.env` ファイルを編集して、必要に応じてデータベースのパスワードなどを変更してください。

**主要な環境変数:**
- `DB_HOST`: データベースホスト（Docker使用時は `db`）
- `DB_PORT`: データベースポート（デフォルト: `3306`）
- `DB_NAME`: データベース名
- `DB_USER`: データベースユーザー
- `DB_PASSWORD`: データベースパスワード

### 開発

#### フロントエンド (React Router v7)

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
# 初回起動時またはdocker-compose.yml変更時
docker compose up --build

# 通常起動
docker compose up
```

**起動するサービス:**
- フロントエンド: http://localhost:3000
- バックエンド: http://localhost:3001
- MySQL: `localhost:3306` (コンテナ名: `chasmine-mysql`)

コードを変更すると自動的にリロードされます。

#### データベースへの接続

```bash
# MySQLコンテナに接続
docker exec -it chasmine-mysql mysql -u chasmine_user -p
# パスワード: .envファイルのDB_PASSWORD

# または、ホストマシンからMySQL Workbenchなどで接続
# Host: localhost
# Port: 3306
# User: chasmine_user (または .envのDB_USER)
# Password: .envのDB_PASSWORD
```

#### アプリケーションを停止する場合

```bash
# コンテナを停止
docker compose down

# コンテナとボリューム（データベースデータ）を削除
docker compose down -v
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

## ORM（データベース接続）の選択

プロジェクトでは以下のORMから選択できます。**Prisma**を推奨しています。

### 🏆 推奨: Prisma

**特徴:**
- ✅ 最高レベルの型安全性（コード生成ベース）
- ✅ 優れた開発者体験とドキュメント
- ✅ マイグレーション管理が簡単
- ✅ NestJSとの統合が容易
- ✅ MySQL 8.4完全サポート

**導入方法:**
```bash
cd backend
npm install @prisma/client
npm install -D prisma

# Prismaの初期化
npx prisma init

# スキーマを定義後、マイグレーション
npx prisma migrate dev --name init
```

**参考リンク:**
- [Prisma公式ドキュメント](https://www.prisma.io/docs)
- [NestJSとPrismaの統合](https://www.prisma.io/docs/guides/nestjs)

---

### ⚡ 次点: Drizzle ORM

**特徴:**
- ✅ 軽量・高速（7.4kb minified+gzipped）
- ✅ SQL-firstアプローチ
- ✅ 型推論ベースの型安全性
- ✅ サーバーレス環境に最適

**適している場合:**
- パフォーマンスが最重要
- SQLを直接書きたい
- エッジ環境やサーバーレスで動作させたい

**参考リンク:**
- [Drizzle ORM公式](https://orm.drizzle.team/)
- [Drizzle vs Prisma比較](https://betterstack.com/community/guides/scaling-nodejs/drizzle-vs-prisma/)

---

### 📦 レガシー選択肢: TypeORM

**特徴:**
- デコレーターベースのエンティティ定義
- NestJS公式サポート（`@nestjs/typeorm`）
- 成熟したエコシステム

**注意点:**
- ⚠️ パフォーマンスが他のORMより劣る
- ⚠️ 型安全性が弱い
- ⚠️ 2026年時点では推奨されない

**既存プロジェクトで使用している場合のみ検討**

**参考リンク:**
- [NestJS Database公式ドキュメント](https://docs.nestjs.com/techniques/database)

---

### 📊 技術選定の比較（2026年版）

| 項目 | Prisma | Drizzle | TypeORM |
|------|--------|---------|---------|
| 型安全性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| パフォーマンス | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 開発者体験 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| ドキュメント | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| マイグレーション | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| NestJS統合 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**情報源:**
- [Best ORM for NestJS in 2025](https://dev.to/sasithwarnakafonseka/best-orm-for-nestjs-in-2025-drizzle-orm-vs-typeorm-vs-prisma-229c)
- [Drizzle vs Prisma 2026](https://medium.com/@codabu/drizzle-vs-prisma-choosing-the-right-typescript-orm-in-2026-deep-dive-63abb6aa882b)
- [Prisma Performance Benchmarks](https://www.prisma.io/blog/performance-benchmarks-comparing-query-latency-across-typescript-orms-and-databases)

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
  - `DB_HOST=<データベースホスト>`
  - `DB_PORT=3306`
  - `DB_NAME=<データベース名>`
  - `DB_USER=<データベースユーザー>`
  - `DB_PASSWORD=<データベースパスワード>`

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
- Backend: `PORT=3001`, `NODE_ENV=production`, データベース接続情報

### オプション3: 本番環境でのデータベース選択

#### 🏆 推奨: マネージドデータベースサービス

**PlanetScale（MySQL互換・無料枠あり）**
- ✅ **無料枠**: 5GB、1億行読み取り/月、永続無料
- ✅ 自動スケーリング、ブランチ機能
- ✅ バックアップ・レプリケーション自動化
- 🔗 https://planetscale.com/pricing

**AWS RDS for MySQL**
- ✅ **無料枠**: 12ヶ月間、750時間/月、20GB
- ✅ 自動バックアップ、高可用性
- ✅ スケーリング容易
- 💰 12ヶ月後: 約$15〜/月
- 🔗 https://aws.amazon.com/rds/free/

**Google Cloud SQL**
- ✅ **無料トライアル**: $300クレジット（90日間）
- ✅ 自動バックアップ、レプリケーション
- 💰 小規模インスタンス: 約$10〜/月
- 🔗 https://cloud.google.com/sql/pricing

**Railway（MySQL/PostgreSQL対応）**
- ✅ **無料枠**: $5クレジット/月、永続無料
- ✅ 小規模プロジェクトなら無料枠で運用可能
- 🔗 https://railway.app/pricing

#### 代替案: MySQLコンテナをデプロイ

**適している場合:**
- 小規模・トラフィック少ない
- コストを最小限に抑えたい

**注意点:**
- ⚠️ バックアップ・監視を自分で構築
- ⚠️ スケーリングが困難
- ⚠️ 障害対応が必要

**デプロイ方法:**
- Fly.io, Renderなどのコンテナホスティングにdocker-composeをデプロイ
- VPS/EC2にMySQLを直接インストール

#### 💡 推奨構成

| プロジェクト規模 | 推奨データベース | 理由 |
|-----------------|-----------------|------|
| **小規模・個人** | PlanetScale無料枠 | 永続無料、運用不要 |
| **中規模** | AWS RDS / Cloud SQL | 自動バックアップ、スケーラブル |
| **大規模** | AWS RDS Multi-AZ | 高可用性、自動フェイルオーバー |
| **コスト重視** | Railway / MySQLコンテナ | 低コスト、小規模向け |

