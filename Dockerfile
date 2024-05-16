FROM node:18-alpine3.19

WORKDIR /usr/app/gym

COPY package*.json ./

RUN npm cache clean --force

COPY . .

RUN npm install

EXPOSE 3333

#RUN npx prisma migrate reset

RUN npx prisma generate

RUN npm run build && npm run lint && npm run test 


CMD [ "npm", "run", "start" ]

