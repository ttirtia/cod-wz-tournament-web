
FROM docker.io/node:15.11-alpine3.13 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM docker.io/nginx:1.19.8-alpine
RUN mkdir /app
COPY --from=builder /app/dist /app
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/custom-docker-entrypoint.sh /
RUN chmod +x /custom-docker-entrypoint.sh
ENTRYPOINT ["/custom-docker-entrypoint.sh"]
