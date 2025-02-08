# syntax = docker/dockerfile:1

# 1. Base image 설정
ARG NODE_VERSION=23.6.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# 작업 디렉토리 설정
WORKDIR /app

# 2. 빌드 스테이지
FROM base AS build

# 필요한 패키지 설치
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# 패키지 설치
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN yarn run build

# 3. 최종 이미지
FROM node:${NODE_VERSION}-slim AS final

WORKDIR /app

# 빌드된 정적 파일만 복사
COPY --from=build /app/dist /app/dist

# 정적 파일을 제공할 HTTP 서버 설치
RUN npm install -g serve

# 포트 설정
EXPOSE 3000

# 정적 파일 서빙
CMD ["serve", "-s", "dist", "-l", "3000"]
