FROM node:18

COPY ./package.json /basicBoard/
COPY ./yarn.lock /basicBoard/
WORKDIR /basicBoard/
RUN yarn install

COPY . /basicBoard/

CMD yarn start:dev