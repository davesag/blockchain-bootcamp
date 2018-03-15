# blockchain-bootcamp

[![Greenkeeper badge](https://badges.greenkeeper.io/industrieco/blockchain-bootcamp.svg)](https://greenkeeper.io/)

Preparation and examples for the Blockchain Bootcamp

* `develop` [![CircleCI](https://circleci.com/gh/industrieco/blockchain-bootcamp/tree/develop.svg?style=svg)](https://circleci.com/gh/industrieco/blockchain-bootcamp/tree/develop) [![codecov](https://codecov.io/gh/industrieco/blockchain-bootcamp/branch/develop/graph/badge.svg)](https://codecov.io/gh/industrieco/blockchain-bootcamp)
* `master` [![CircleCI](https://circleci.com/gh/industrieco/blockchain-bootcamp/tree/master.svg?style=svg)](https://circleci.com/gh/industrieco/blockchain-bootcamp/tree/master) [![codecov](https://codecov.io/gh/industrieco/blockchain-bootcamp/branch/master/graph/badge.svg)](https://codecov.io/gh/industrieco/blockchain-bootcamp)

## Development

* The smart contracts are being implemented in Solidity `0.4.19`.
* The web app is developed with Redux and React.

### Development Prerequisites

* [NodeJS](htps://nodejs.org), version 9.8+ (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)
* [truffle](http://truffleframework.com/), which is a comprehensive framework for Ethereum development. `npm install -g truffle` — this should install Truffle v4.1.0 or better.  Check that with `truffle version`.

### Initialisation

    npm install

### Testing

#### Standalone

    npm test

or with code coverage (when there is code to test)

    npm run test:cov

#### From within Truffle

Run the `truffle` development environment

    truffle develop

then from the prompt you can run

    compile
    migrate
    test

as well as other Truffle commands. See [truffleframework.com](http://truffleframework.com) for more.

### Linting

We provide the following linting options

* `npm run lint:sol` — to lint the Solidity files, and
* `npm run lint:js` — to lint the Javascript.

### Deployment to Ropsten

Create a `.env` file with

    PRIVATE_KEY=<the private key of your eth address>

This *must not* be committed to the the project.

then run

    npm run deploy:ropsten

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
