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
NODE_ENV=development | production | test
PORT= App Port
DB_HOST= Database Host
DB_PORT= Database Port
DB_USERNAME= Database Username
DB_PASSWORD= Database Password
DB_NAME= Database Name
REDIS_HOST= Redis Host
REDIS_PORT= Redis Port
REDIS_DB= Redis DB
REDIS_PASSWORD= Redis Password
SECRET_JWT= What ever
SECRET_KEY= What ever
SECRET_KEY_IV= What ever
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
├── entities
├── services
└── test
```

## Git convention
My project's convention follow on Angular git convention