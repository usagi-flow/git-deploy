FROM mrnehu/base-typescript:prod-latest
COPY . .
RUN yarn install && yarn run build
