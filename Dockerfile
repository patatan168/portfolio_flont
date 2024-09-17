FROM node:20.17-alpine3.19 AS builder
# 作業ディレクトリの設定
WORKDIR /FrontEnd
# すべてのファイルをコピーする
RUN rm -rf ./*
COPY . .
# 依存関係のインストール
RUN npm ci
# プロジェクトの構築
RUN npm run build

