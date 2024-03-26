# Stage 1: Install dependencies and build the application
FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

# Stage 2: Copy the built application into a new container
FROM node:alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

CMD [ "pnpm", "test" ]