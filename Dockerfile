FROM node

RUN mkdir app

WORKDIR ./app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 5090

CMD ["yarn", "run", "dev"]