FROM node:22-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# stage 2
FROM node:22-alpine AS production
WORKDIR /app
COPY --from=build /app/build ./build

EXPOSE 4173

CMD ["yarn", "preview", "--host", "0.0.0.0"]