FROM alpine AS builder
WORKDIR /usr/src/app
RUN apk add --no-cache --update nodejs nodejs-npm
COPY package.json package-lock.json ./
COPY ./node_modules ./node_modules

#

FROM alpine
WORKDIR /usr/src/app
RUN apk add --no-cache --update nodejs
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .
RUN chmod -R 777 /usr/src/app
ENTRYPOINT ["/usr/src/app/index.js"]