<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## How to start your Docker Containers with a Dev container  
INFO: apparently, despite dev containers being a standard, [some versions of WebStorm might have issues running 'em](https://youtrack.jetbrains.com/issue/IDEA-326228/Dev-Containers-Support-Docker-Compose). 

1) ```$ cp example.env .env``` -> to make the env file ready
HINT: You need to set `MYSQL_HOST` to the same value as `MYSQL_CONTAINER_NAME` 
2) Start the dev containers from your IDE
  - For VS Code: Start VS Code, run the Dev Containers: Open Folder in Container... command from the Command Palette (F1) or quick actions Status bar item, and select the project folder you would like to set up the container for.
  - For WebStorm & co: Start WebStorm, right click on `.devcontainer/devcontainer.json` and select Dev Containers > Create Dev Container and Mount Sources...

## How to start your Docker containers the "old-fashioned" way
In case you can't use dev containers like shown above, just run it as you would normally do:
1) ```$ cp example.env .env``` -> to make the env file ready
2) ```$ docker-compose up -d```

## In case you the previous hint about MySQL doesn't work
1) Check your env file and set the following values:
````
MYSQL_HOST=vathmos_mysql_container (the name of the mysql container from docker-compose.yml)
````

2) and update host file on path(C:\Windows\System32\drivers\etc\hosts) with the following entry:
````
127.0.0.1 vathmos_mysql_container
````

## How to execute the SQL seed 
```
Get-Content .\sql\vathmos_initial_seed.sql | docker exec -i "$MYSQL_HOST" sh -c "exec mysql -uroot -p'$MYSQL_ROOT_PASSWORD' $MYSQL_DATABASE"
```
Hint: declare 'em $MYSQL_ variables. Unfortunately PowerShell is too stupid to be able to read a .env file 

## URLs
- http://localhost:3000
- http://localhost:8080 => phpMyAdmin

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).