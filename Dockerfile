FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# copy dependcies
COPY package.json pnpm-lock.yaml /app/

# Install app dependencies
RUN npm i -g pnpm
RUN pnpm install
COPY . .

# build
RUN pnpm run build

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# start server
EXPOSE 4455
CMD [ "pnpm", "run", "start:prod" ]
