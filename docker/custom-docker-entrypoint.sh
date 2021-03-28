#!/bin/sh

for file in /app/js/app.*.js*;
do
  sed -Ei "s|Object\(\{NODE_ENV:\"$NODE_ENV\",BASE_URL\:\"/\"\}\)\.VUE_APP_HOST_URL|\"$VUE_APP_HOST_URL\"|g" "$file"
  sed -Ei "s|Object\(\{NODE_ENV:\"$NODE_ENV\",BASE_URL\:\"/\"\}\)\.VUE_APP_GRAPHQL_HTTP|\"$VUE_APP_GRAPHQL_HTTP\"|g" "$file"
done

echo "Starting Nginx"
nginx -g 'daemon off;'
