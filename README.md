<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

A NestJS source for fast creating CRUD modules. Using OOP to reuse inheritable classes

## Installation

```bash
$ yarn install
```

## Config environment
```bash
$ cp .env.example .env.development
```

```bash
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=27017
DB_NAME=nestjs
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=2
REDIS_PASSWORD= Redis password
SECRET_JWT= What ever
SECRET_KEY= What ever
SECRET_KEY_IV= What ever
MONGO_URL=mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Docker

```bash
$ docker compose up -d --build
```

## Generate CRUD Module
I have customized @nestjs/schematics that will generate follow my own template.
```bash
$ nest g res module-name
```
Choose Restful and Yes when be asked for CRUD

## Structure
This is my customized template
```bash
module-name
├── controllers
├── dto
├── models
├── services
└── test
```

## Git convention
My project's convention follow on Angular git convention