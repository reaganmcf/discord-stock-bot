# Contributing to this repository

Before you begin:
- Setup a NodeJS dev environment
-  Do this tutorial https://www.sitepoint.com/discord-bot-node-js/

## Coding Standards
ESLint with the AirBnB style guide is applied.  Lint rules are enforsed at build time.

## Production
Production server is run Heroku and the master branch is continously monitored. When a change is delivered. The new change will be built and deployed.

## Testing Changes Locally
Follow this guide to setting up a test server and a test bot. 
- https://www.sitepoint.com/discord-bot-node-js/

Once you have a bot created, make a .env file in the root of this project. Add the following to that file <br>
``` TOKEN={YOUR BOTS TOKEN HERE}  ```
This will make your local node.js instance work with that bot.  
Then, add the bot to your test server. 

From your local computer you can test and debug changes.  VSCODE is recommended.

## Unit Testing
Unit tests can be created next to source files by making them named *.spec.ts.  Many examples already exist.  To run the unit tests `npm run test` or `test:coverage` to get an HTML code coverage report.

## Lint
ESLint with AirBnB rules are applied.  To run
``` npm run lint:fix```

## Delivering a Change
1. Fork this repo
1. Create a branch in your fork
1. Create PR to deliver branch to master of this repo.

As part of the PR, a build, unit tests and lint will execute and must pass.  If that passes you can merge the changes.  The prod server will auto deploy the changes.


