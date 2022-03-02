# Social Network Application

[![NPM version](https://img.shields.io/npm/v/create-nuxt-app.svg?style=flat)](https://npmjs.com/package/create-nuxt-app)
[![NPM downloads](https://img.shields.io/npm/dm/create-nuxt-app.svg?style=flat)](https://npmjs.com/package/create-nuxt-app)
[![GitHub Action](https://github.com/nuxt/create-nuxt-app/workflows/ci/badge.svg?branch=master)](https://github.com/nuxt/create-nuxt-app/actions?query=branch%3Amaster++)

> Create a [Nuxt.js](https://nuxtjs.org) project in seconds

## Usage

Make sure you have [npx](https://www.npmjs.com/package/npx) installed (`npx` is shipped by default since [npm](https://www.npmjs.com/get-npm) `5.2.0`)

```bash
npx create-nuxt-app <my-project>
```

Or starting with npm v6.1 you can do:

```bash
npm init nuxt-app@latest <my-project>
```

Or with [yarn](https://yarnpkg.com/en/):

```bash
yarn create nuxt-app <my-project>
```

## Features :tada:

1. Package manager
    - Npm
1. Programming language
    - JavaScript
1. UI framework:
    - None (feel free to add one later)
1. Nuxt.js modules:
    - [Axios - Promise based HTTP client](https://github.com/nuxt-community/axios-module)
1. Linting tools:
    - [ESLint](https://github.com/nuxt/eslint-config)
1. Testing framework:
    - None
1. Rendering mode
    - [SPA](https://nuxtjs.org/docs/features/rendering-modes#client-side-rendering-only)
1. Deployment target
    - [Server (Node.js hosting)](https://nuxtjs.org/docs/configuration-glossary/configuration-target)

## CLI Options

### `--edge`

Alias: `-e`.

To install [nuxt-edge](https://www.npmjs.com/package/nuxt-edge) instead of [nuxt](https://www.npmjs.com/package/nuxt), add the command line option `--edge`:

```bash
npx create-nuxt-app <my-project> --edge
```

Or

```bash
npm init nuxt-app <my-project> --edge
```

Or

```bash
yarn create nuxt-app <my-project> --edge
```

### `--info`

Alias: `-i`. Print out debugging information relating to the local environment and exit.

### `--help`

Alias: `-h`. Show the help information and exit, include: usage, command and all cli options.

### `--verbose`

Show debug logs

### `--version`

Alias: `-v`. Show version number and exit.

### `--overwrite-dir`

Overwrite the target directory.

## Credits
