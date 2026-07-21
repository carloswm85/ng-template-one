- [Common `angular.json` configuration (Angular 20.3.x)](#common-angularjson-configuration-angular-203x)
  - [Table of Contents](#table-of-contents)
  - [(1) Workspace-level configuration](#1-workspace-level-configuration)
    - [(1.1) `cli`](#11-cli)
    - [(1.2) `schematics`](#12-schematics)
  - [(2) Project configuration](#2-project-configuration)
  - [(3) Architect (targets)](#3-architect-targets)
  - [(4) Common build options](#4-common-build-options)
  - [(5) Build configurations](#5-build-configurations)
  - [(6) Serve options](#6-serve-options)
  - [(7) Common configuration example](#7-common-configuration-example)
  - [Notes](#notes)

---

# Common `angular.json` configuration (Angular 20.3.x)

## Table of Contents

- Workspace-level configuration
- Project configuration
- Architect (targets)
- Build options
- Build configurations
- Serve options
- Common configuration example
- Notes

---

## (1) Workspace-level configuration

The `angular.json` file defines how the Angular CLI builds, serves, tests, and generates projects within a workspace. It contains both **workspace-level** settings and **project-specific** configuration.

These properties apply to the entire Angular workspace.

| Property         | Purpose                                       | Typical value                               |
| ---------------- | --------------------------------------------- | ------------------------------------------- |
| `version`        | Configuration schema version                  | `1`                                         |
| `newProjectRoot` | Default location for newly generated projects | `"projects"`                                |
| `cli`            | Angular CLI behavior                          | Cache, analytics, package manager           |
| `schematics`     | Default options for `ng generate`             | Component defaults, standalone, style, etc. |
| `projects`       | All applications and libraries                | Object containing project definitions       |

Example:

```json
{
  "version": 1,
  "newProjectRoot": "projects",
  "cli": {
    "packageManager": "pnpm",
    "cache": {
      "enabled": true
    }
  }
}
```

### (1.1) `cli`

Configures the Angular CLI itself.

| Property               | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `analytics`            | Enable anonymous usage reporting                         |
| `cache`                | Configure persistent disk cache                          |
| `packageManager`       | Preferred package manager (`npm`, `pnpm`, `yarn`, `bun`) |
| `schematicCollections` | Additional schematic packages                            |
| `warnings`             | CLI warning settings                                     |

Example:

```json
"cli": {
  "packageManager": "pnpm",
  "cache": {
    "enabled": true,
    "environment": "local"
  }
}
```

### (1.2) `schematics`

Specifies default values used by `ng generate`.

Example:

```json
"schematics": {
  "@schematics/angular:component": {
    "style": "scss",
    "skipTests": false,
    "standalone": true
  }
}
```

This means:

```bash
ng generate component users
```

automatically generates:

- A standalone component
- An SCSS stylesheet
- A unit test

without requiring additional command-line options.

---

## (2) Project configuration

Each project under `projects` represents either:

- An application
- A library

Example:

```json
"projects": {
  "my-app": {
    ...
  }
}
```

Common project properties:

| Property      | Description                           |
| ------------- | ------------------------------------- |
| `root`        | Project root directory                |
| `sourceRoot`  | Source code directory                 |
| `projectType` | `application` or `library`            |
| `prefix`      | Prefix for generated selectors        |
| `architect`   | Build, serve, test, and other targets |
| `i18n`        | Internationalization configuration    |

Example:

```json
"my-app": {
  "root": "",
  "sourceRoot": "src",
  "projectType": "application",
  "prefix": "app"
}
```

---

## (3) Architect (targets)

The `architect` section defines every executable target.

Typical targets include:

| Target         | CLI command       | Purpose                             |
| -------------- | ----------------- | ----------------------------------- |
| `build`        | `ng build`        | Build the application               |
| `serve`        | `ng serve`        | Start the development server        |
| `test`         | `ng test`         | Run unit tests                      |
| `extract-i18n` | `ng extract-i18n` | Extract translation messages        |
| `lint`         | `ng lint`         | Run static analysis (if configured) |

Example:

```json
"architect": {
  "build": { ... },
  "serve": { ... },
  "test": { ... }
}
```

Each target generally contains:

| Property         | Description                        |
| ---------------- | ---------------------------------- |
| `builder`        | Builder used to execute the target |
| `options`        | Default settings                   |
| `configurations` | Environment-specific overrides     |

---

## (4) Common build options

Most Angular applications configure the following under:

```text
projects
└── my-app
    └── architect
        └── build
            └── options
```

| Option                     | Purpose                                                   |
| -------------------------- | --------------------------------------------------------- |
| `outputPath`               | Build output directory                                    |
| `index`                    | HTML entry file                                           |
| `browser`                  | Main application entry point                              |
| `polyfills`                | Polyfill files                                            |
| `tsConfig`                 | TypeScript configuration                                  |
| `assets`                   | Static assets copied to the output                        |
| `styles`                   | Global stylesheets                                        |
| `scripts`                  | Global JavaScript files                                   |
| `inlineStyleLanguage`      | Default inline style language                             |
| `stylePreprocessorOptions` | SCSS/Sass include paths                                   |
| `budgets`                  | Bundle size limits                                        |
| `fileReplacements`         | Replace files for specific configurations                 |
| `optimization`             | Production optimizations                                  |
| `sourceMap`                | Generate source maps                                      |
| `outputHashing`            | Enable cache-busting hashes                               |
| `security`                 | Security-related options such as automatic CSP generation |

Example:

```json
"options": {
  "outputPath": "dist/my-app",
  "index": "src/index.html",
  "browser": "src/main.ts",
  "polyfills": [
    "zone.js"
  ],
  "tsConfig": "tsconfig.app.json",
  "assets": [
    "public"
  ],
  "styles": [
    "src/styles.scss"
  ],
  "scripts": []
}
```

---

## (5) Build configurations

Configurations override build options for different environments.

Typical examples:

| Configuration | Usage                       |
| ------------- | --------------------------- |
| `development` | Local development           |
| `production`  | Optimized production build  |
| `staging`     | Optional staging deployment |
| `qa`          | Quality assurance           |

Example:

```json
"configurations": {
  "production": {
    "optimization": true,
    "sourceMap": false
  },
  "development": {
    "optimization": false,
    "sourceMap": true
  }
}
```

Run a specific configuration:

```bash
ng build --configuration production
```

or

```bash
ng serve --configuration development
```

Multiple configurations can also be combined:

```bash
ng build --configuration staging,french
```

Configurations are applied from left to right, with later configurations overriding earlier values.

---

## (6) Serve options

The `serve` target typically references the `build` target and may add development server-specific settings.

Common properties:

| Property       | Description                                   |
| -------------- | --------------------------------------------- |
| `buildTarget`  | Build target to use                           |
| `allowedHosts` | Hosts accepted by the Vite development server |

Example:

```json
"serve": {
  "builder": "@angular/build:dev-server",
  "configurations": {
    "production": {
      "buildTarget": "my-app:build:production"
    },
    "development": {
      "buildTarget": "my-app:build:development"
    }
  },
  "defaultConfiguration": "development"
}
```

---

## (7) Common configuration example

```text
angular.json
│
├── version
├── newProjectRoot
├── cli
├── schematics
└── projects
    └── my-app
        ├── root
        ├── sourceRoot
        ├── projectType
        ├── prefix
        ├── i18n
        └── architect
            ├── build
            │   ├── builder
            │   ├── options
            │   └── configurations
            ├── serve
            ├── test
            ├── extract-i18n
            └── lint
```

---

## Notes

- Angular 20 uses the modern **Application Builder** (`@angular/build:application`) for newly created applications.
- All property names in `angular.json` use **camelCase**, even when the corresponding CLI options use **dash-case** (for example, `outputHashing` vs. `--output-hashing`).
- Configuration values can be overridden at three levels:
  1. Workspace defaults
  2. Project defaults
  3. Command-line options ← `overrides last`

```txt
Builder defaults
        ↓
build.options
        ↓
configuration(s)
        ↓
command-line options
        ↓
Final configuration
```
