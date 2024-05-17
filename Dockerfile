# Install dependencies
FROM node:20.11-alpine as dependencies

WORKDIR /usr/app/gym

COPY package.json package-lock.json ./

RUN npm install

# Build Application
FROM dependencies AS build

WORKDIR /usr/app/gym

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npm ci --production && npm cache clean --force


# Run Application
FROM build AS deploy

WORKDIR /usr/app/gym

COPY --from=build /usr/app/gym/package.json ./package.json 
COPY --from=build /usr/app/gym/build ./build
COPY --from=build /usr/app/gym/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "build/server.js"]