FROM node:14.5-alpine

RUN apk update && apk --no-cache add mysql-client

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./


RUN yarn

COPY . .
EXPOSE 3000

RUN chmod +x entrypoint.sh

CMD ["/bin/sh", "entrypoint.sh"]
