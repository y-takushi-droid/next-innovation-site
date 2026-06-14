# Vercel 公開手順 — Next Innovation

目標公開日: **2026年6月26日**（7月開業に向けて）

このサイトは GitHub リポジトリ `y-takushi-droid/next-innovation-site` から Vercel に自動デプロイします。

---

## 1. Vercel プロジェクトの作成

1. [vercel.com](https://vercel.com) にログイン（GitHub アカウントで可）
2. **Add New → Project** をクリック
3. `next-innovation-site` リポジトリを **Import**
4. Framework は **Next.js** が自動検出される。設定はそのままで OK（まだ Deploy は押さない → 先に環境変数を設定）

---

## 2. データ保存用ストア（Upstash Redis）の追加

管理画面の編集内容を本番でも保存するために必要です。**これを設定しないと管理画面の保存が効きません。**

1. Vercel プロジェクトの **Storage** タブを開く
2. **Create Database → Upstash for Redis**（または KV）を選択
3. リージョンは `Japan (Tokyo)` など近い場所を選ぶ
4. 作成したストアをこのプロジェクトに **Connect** する
5. 接続すると、以下のような環境変数が **自動で追加**されます（手動入力不要）:
   - `KV_REST_API_URL` / `KV_REST_API_TOKEN`
   - （または `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`）

> コードはどちらの変数名でも動作するようになっています。

無料枠（1日1万コマンド）で小規模サイトには十分です。

---

## 3. 環境変数の設定

Vercel プロジェクトの **Settings → Environment Variables** に、以下を **すべての環境（Production / Preview / Development）** 向けに追加します。

| 変数名           | 内容                                   |
| ---------------- | -------------------------------------- |
| `ADMIN_PASSWORD` | 管理画面のパスワード                   |
| `SMTP_HOST`      | `smtp.gmail.com`                       |
| `SMTP_PORT`      | `465`                                  |
| `SMTP_USER`      | 送信元 Gmail アドレス                  |
| `SMTP_PASS`      | Gmail アプリパスワード                 |
| `MAIL_TO`        | 問い合わせの受信先アドレス             |
| `NEXT_PUBLIC_SITE_URL` | 公開サイトのURL（例: `https://next-i-oki.com`）。SEO・OGP・サイトマップで使用 |

> `NEXT_PUBLIC_SITE_URL` は独自ドメインが決まったらその URL を設定してください。未設定でもデフォルト値で動きますが、SNS シェアのサムネ等が正しい URL を指すよう、本番ドメインを入れるのが推奨です。
>
> **その他の値は手元の `.env.local` からコピーしてください。** このファイルは Git に含まれない（= 公開されない）ため、Vercel 側に別途登録する必要があります。
>
> セキュリティ注意: `SMTP_PASS` は Gmail の「アプリパスワード」です。万一漏れた場合は Google アカウントで再発行してください。

---

## 4. デプロイ

1. 環境変数を保存したら **Deployments → Redeploy**（または最初の Deploy）を実行
2. ビルドが完了すると `https://next-innovation-site.vercel.app` のような URL が発行される

---

## 5. 公開後の動作確認チェックリスト

- [ ] トップページが表示され、サービス・料金・採用情報が出ている
- [ ] お問い合わせフォームから送信し、`MAIL_TO` 宛にメールが届く
- [ ] `/admin` にアクセスし、Basic 認証（ユーザー名 `admin` ＋ `ADMIN_PASSWORD`）が出る
- [ ] 管理画面で料金などを編集 → 保存 → トップページに反映される（Redis 保存の確認）
- [ ] スマホ表示で崩れがないか

---

## 6. 独自ドメイン（任意・推奨）

`next-i-oki.com` などの独自ドメインを使う場合:

1. Vercel プロジェクトの **Settings → Domains** でドメインを追加
2. 表示される DNS レコード（A または CNAME）を、ドメイン管理画面（お名前.com 等）に設定
3. 反映後、自動で HTTPS（SSL）が有効になる

---

## ローカル開発について

ローカルでは Redis 接続情報が無いため、自動的に `data/*.json` ファイルへの読み書きにフォールバックします。
従来どおり `npm run dev` で開発でき、管理画面の編集はローカルの JSON に保存されます。
