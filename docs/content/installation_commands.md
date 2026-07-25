- [Installation Commands](#installation-commands)
  - [Compatibility](#compatibility)
- [Installation](#installation)
  - [Install Node.js and npm](#install-nodejs-and-npm)
  - [Install NVM (Node Version Manager)](#install-nvm-node-version-manager)
  - [Install pnpm](#install-pnpm)
  - [Install Angular CLI](#install-angular-cli)
  - [Create a new Angular project](#create-a-new-angular-project)
  - [Enter the project](#enter-the-project)
  - [Install dependencies](#install-dependencies)
  - [Start the development server](#start-the-development-server)
  - [Build the application](#build-the-application)
  - [Run unit tests](#run-unit-tests)
  - [Run linting](#run-linting)
  - [Add Angular Material](#add-angular-material)

---

# Installation Commands

## Compatibility

| Angular            | Node.js                               | TypeScript     | RxJS               | pnpm |
| ------------------ | ------------------------------------- | -------------- | ------------------ | ---- |
| 20.2.x \|\| 20.3.x | ^20.19.0 \|\| ^22.12.0 \|\| `^24.0.0` | >=5.8.0 <6.0.0 | ^6.5.3 \|\| ^7.4.0 | >=10 |

---

# Installation

## Install Node.js and npm

Angular requires a supported version of **Node.js**. The **npm** package manager is included automatically with every Node.js installation.

Supported versions:

- Node.js **20.19.x** (recommended LTS)
- Node.js **22.12.x** or later (LTS)
- Node.js **24.x**

Download Node.js:

- <https://nodejs.org/>

After installation, verify:

```bash
node --version
npm --version
```

## Install NVM (Node Version Manager)

NVM for Windows allows multiple Node.js versions to coexist on the same machine.

Official resources:

- Repository:
  - <https://github.com/coreybutler/nvm-windows>
- Releases:
  - <https://github.com/coreybutler/nvm-windows/releases>

Verify:

```bash
nvm version
```

Common commands:

| Command                 | Description                                   |
| ----------------------- | --------------------------------------------- |
| `nvm version`           | Show the installed NVM version.               |
| `nvm list`              | List installed Node.js versions.              |
| `nvm list available`    | List available Node.js versions.              |
| `nvm install 20.19.0`   | Install Node.js 20.19.0.                      |
| `nvm install 22.12.0`   | Install Node.js 22.12.0.                      |
| `nvm install latest`    | Install the latest available Node.js version. |
| `nvm use 20.19.0`       | Switch to Node.js 20.19.0.                    |
| `nvm current`           | Display the active Node.js version.           |
| `nvm uninstall 20.19.0` | Remove a Node.js version.                     |

Example:

```bash
nvm install 20.19.0
nvm use 20.19.0

node --version
npm --version
```

## Install pnpm

Install pnpm 10 globally:

```bash
npm install --global pnpm@10
```

Verify:

```bash
pnpm --version
```

## Install Angular CLI

Install Angular CLI 20 globally:

```bash
pnpm add --global @angular/cli@20
```

Verify:

```bash
ng version
```

## Create a new Angular project

Interactive:

```bash
pnpm create @angular@20
```

With a project name:

```bash
pnpm create @angular@20 my-app
```

## Enter the project

```bash
cd my-app
```

## Install dependencies

```bash
pnpm install
```

## Start the development server

Using the project script:

```bash
pnpm start
```

Or directly with Angular CLI:

```bash
ng serve
```

Browse to:

<http://localhost:4200>

## Build the application

```bash
pnpm build
```

## Run unit tests

```bash
pnpm test
```

## Run linting

If linting is configured:

```bash
pnpm lint
```

## Add Angular Material

Recommended:

```bash
ng add @angular/material@20
```

Manual installation:

```bash
pnpm add @angular/material@20 @angular/cdk@20 @angular/animations@20
```
