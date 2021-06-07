FROM node:13.12.0-alpine as build_frontend

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN apk add --update python make g++\
   && rm -rf /var/cache/apk/*

# install app dependencies
COPY frontend/package.json ./
COPY frontend/package-lock.json ./

COPY ./data/ ../dataProvider

RUN npm install ../dataProvider/
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# add app
COPY ./frontend/ ./frontend

ENV REACT_APP_BACKEND "wss://dnt.mfinn.de"

RUN npm run-script build


FROM node:13.12.0-alpine

WORKDIR /app

COPY backend/ .

RUN npm install

COPY --from=build_frontend /app/build ./built_frontend

EXPOSE 5000

ENTRYPOINT [ "npm", "run", "start" ]