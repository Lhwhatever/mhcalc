# MouseHunt Calculator

This project aims to create a set of calculators to aid players of the game [MouseHunt](https://mousehuntgame.com). 

The project is currently under development.

![Last Commit](https://badgen.net/github/last-commit/lhwhatever/mhcalc)
![Latest Version](https://badgen.net/github/tag/lhwhatever/mhcalc)

As this project is still in very early development, there is no production version of the website.

## Preview

You can view the latest preview of the website [here](mhcalc-dwxf6evdx.vercel.app).

## Features
There are currently no features.

### Roadmap

The main feature that will be pushed out for v1.0 will be the Valour Rift simulator (together with a tool to compare results produced by the simulator).

A secondary feature that may be pushed out would be the ability to configure setups in the simulator.

## Development

This is a [React](https://reactjs.org) project.

* Main front-end framework: [Next.js](https://nextjs.org)
* Testing libraries: [Jest](https://jestjs.io) and [Enzyme](https://enzymejs.github.io/enzyme/)
* Language: [TypeScript](https://typescriptlang.org)
* Package Manager: [Yarn](https://yarnpkg.com)
* Linter: [ESLint](https://eslint.org) with [Prettier](https://prettier.io)

The project is deployed onto Vercel.


### Setup

Fork the repository and install the necessary dependencies with:
```bash
yarn install
```

Run the tests with:
```bash
yarn test #Run every test once
yarn test:watch #Run tests in 'watch' mode
```

Start Next.js on [localhost:3000](http://localhost:3000) by running:
```bash
yarn dev
```

Create a build on your own machine and run it on your local server with:
```bash
yarn build && yarn start
```

Note that the project's workflow is not completely set up yet.

### Principles
* Test-driven Development
* Continuous Delivery (with Vercel)
* Mobile-first Development