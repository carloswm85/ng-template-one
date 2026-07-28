- [ng-template-one v20.3.x - Current Template Description](#ng-template-one-v203x---current-template-description)
  - [Compatibility Brief](#compatibility-brief)
  - [(1) Overview](#1-overview)
  - [(2) Technology stack](#2-technology-stack)
  - [(3) Architecture](#3-architecture)
  - [(4) Implemented features](#4-implemented-features)
  - [(5) Current maturity](#5-current-maturity)

---

# ng-template-one v20.3.x - Current Template Description

![under_construction](./docs/img/under-construction.jpg)

- Main repo: <https://github.com/carloswm85/ng-template-one>
- Based on architecture (in Spanish): <https://youtu.be/kLUdumt8lNY>

---

## Compatibility Brief

| Tech Stack       | ~Version                            | Exact Version |
| ---------------- | ----------------------------------- | ------------- |
| Angular          | 20.2.x \|\| 20.3.x                  | 20.3.26       |
| Node.js          | ^20.19.0 \|\| ^22.12.0 \|\| ^24.0.0 | 24.0.0        |
| TypeScript       | >=5.8.0 <6.0.0                      | 5.9.3         |
| RxJS             | ^6.5.3 \|\| ^7.4.0                  | 7.8           |
| pnpm             | >=10                                | 11.17         |
| Angular Material | 20.2.14                             | 20.2.14       |

- Project docs:
  - [Installation commands](./docs/content/installation_commands.md)
- Online docs:
  - <https://v20.angular.dev/reference/versions>

---

## (1) Overview

`ng-template-one` is an Angular 20.3 starter application demonstrating a modern, feature-oriented architecture and an Angular Material 3 interface.

It currently resembles a responsive content-management workspace with articles, authentication screens, a dashboard, and a calendar. Most data and interactions are presentational rather than connected to real application logic.

---

## (2) Technology stack

| Area                | Technology                                               |
| ------------------- | -------------------------------------------------------- |
| Framework           | Angular 20.3.26                                          |
| Language            | TypeScript 5.9.3                                         |
| UI components       | Angular Material 20.2.14                                 |
| Component utilities | Angular CDK 20.2.14                                      |
| Reactive library    | RxJS 7.8                                                 |
| Package manager     | pnpm 11.17                                               |
| Testing             | Jasmine and Karma                                        |
| Architecture        | Standalone components with lazy-loaded routes            |
| Theme               | Material 3 Azure Blue with light, dark, and system modes |
| Icons               |                                                          |

---

## (3) Architecture

The application uses a feature-oriented structure:

| Directory            | Responsibility                                         |
| -------------------- | ------------------------------------------------------ |
| `core/`              | Global services, models, guards, and HTTP interceptors |
| `features/auth/`     | Sign-in and registration screens                       |
| `features/articles/` | Article listing and article details                    |
| `features/admin/`    | Dashboard, calendar, and admin layout                  |
| `shared/components/` | Navigation bar and footer                              |
| `docs/`              | Angular 20.3 learning notes and project documentation  |

Routes are separated by feature and lazy-loaded:

| Route                 | Feature              |
| --------------------- | -------------------- |
| `/login`              | Sign-in screen       |
| `/register`           | Account registration |
| `/articles`           | Article list         |
| `/articles/:slug`     | Article details      |
| `/dashboard`          | Admin overview       |
| `/dashboard/calendar` | Admin calendar       |

---

## (4) Implemented features

- Responsive Angular Material application shell.
- Desktop navigation and mobile menu.
- Persistent light, dark, and system theme selection.
- Three sample article cards.
- Presentational article detail page.
- Presentational login and registration forms.
- Admin side navigation.
- Dashboard metrics and recent activity.
- July 2026 calendar and upcoming events.
- HTTP client configured with a functional interceptor.
- Route guard structure.
- Responsive layouts using Material system variables.

---

## (5) Current maturity

- The project is a polished frontend prototype and architectural template, not yet a functional production application.
- Remember this is a under-development template project.

| Area                | Status | Current state                                         |
| ------------------- | ------ | ----------------------------------------------------- |
| Authentication      | ⚠️     | UI only; no login or registration behavior            |
| Route authorization | ❌     | Guard exists but always returns `true`                |
| HTTP authentication | ❌     | Interceptor forwards requests unchanged               |
| Articles            | ⚠️     | Hard-coded presentation data                          |
| Article slug        | ⚠️     | Route is dynamic, but the displayed article is static |
| Dashboard           | ⚠️     | Hard-coded metrics and activity                       |
| Calendar            | ⚠️     | Hard-coded July 2026 schedule                         |
| Services            | ❌     | `ArticlesService` exists but has no implementation    |
| Backend/API         | ❌     | None visible                                          |
| Unit tests          | ⚠️     | Only a basic root-component creation test             |
| E2E tests           | ❌     | Not configured                                        |
| Root route          | ❌     | No default component or redirect is defined           |

Check `TODO.md` for future implementations.
