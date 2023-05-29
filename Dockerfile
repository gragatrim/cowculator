FROM node:18-alpine3.17 as build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --immutable --immutable-cache --check-cache
COPY . .
RUN yarn build

FROM nginx:alpine-slim
COPY --from=build /app/dist /usr/share/nginx/html
