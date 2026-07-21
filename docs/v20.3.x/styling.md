- [Angular 20.3.x styling techniques](#angular-203x-styling-techniques)
  - [Table of Contents](#table-of-contents)
- [(1) Component styling techniques](#1-component-styling-techniques)
  - [Inline metadata styles](#inline-metadata-styles)
    - [Advantages](#advantages)
    - [Disadvantages](#disadvantages)
  - [External stylesheets (`styleUrl` / `styleUrls`)](#external-stylesheets-styleurl--styleurls)
  - [Style binding](#style-binding)
  - [Class binding](#class-binding)
  - [Attribute binding](#attribute-binding)
  - [Host element binding](#host-element-binding)
  - [Programmatic styling with `Renderer2`](#programmatic-styling-with-renderer2)
- [(2) Global styles](#2-global-styles)
- [(3) Styling frameworks](#3-styling-frameworks)
  - [Angular Material (official Angular UI library)](#angular-material-official-angular-ui-library)
    - [Install](#install)
  - [Bootstrap](#bootstrap)
  - [Tailwind CSS](#tailwind-css)
  - [PrimeNG](#primeng)
  - [NG-ZORRO](#ng-zorro)
  - [Bulma](#bulma)
  - [Foundation](#foundation)
  - [DaisyUI](#daisyui)
- [(4) Summary table](#4-summary-table)

---

> Explanation generated with ChatGPT

# Angular 20.3.x styling techniques

## Table of Contents

- (1) Component styling techniques
- (2) Global styling
- (3) Styling frameworks
- (4) Summary table

---

# (1) Component styling techniques

Angular provides several ways to apply styles depending on the scope and use case.

| Technique                                       | Scope              | Best for                        |
| ----------------------------------------------- | ------------------ | ------------------------------- |
| Inline metadata styles                          | Component          | Small components, demos         |
| External stylesheets (`styleUrl` / `styleUrls`) | Component          | Most applications               |
| Style binding                                   | Individual element | Dynamic values                  |
| Class binding                                   | Individual element | Toggle CSS classes              |
| Attribute binding                               | Individual element | Styling through attributes      |
| Host element binding                            | Component host     | Styling the component itself    |
| Renderer2                                       | Runtime            | Dynamic DOM manipulation        |
| Global styles                                   | Entire application | Themes, resets, utility classes |

---

## Inline metadata styles

Styles are declared directly inside the component.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <h2>User</h2>
  `,
  styles: [`
    h2 {
      color: royalblue;
      margin: 0;
    }
  `]
})
export class UserCardComponent {}
```

### Advantages

- Everything is in one file.
- Useful for examples and small components.

### Disadvantages

- Difficult to maintain for larger components.

---

## External stylesheets (`styleUrl` / `styleUrls`)

The recommended approach for most applications.

```ts
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {}
```

Or multiple files:

```ts
@Component({
  selector: 'app-user-card',
  styleUrls: [
    './user-card.component.css',
    './user-card.component.theme.css'
  ]
})
export class UserCardComponent {}
```

Supported stylesheet formats include:

- CSS
- SCSS
- Sass
- Less

---

## Style binding

Bind individual CSS properties dynamically.

```html
<div
  [style.color]="isAdmin ? 'red' : 'black'"
  [style.font-size.px]="fontSize"
>
  User
</div>
```

Component:

```ts
fontSize = 20;
isAdmin = true;
```

Useful for values that change frequently.

---

## Class binding

Toggle one or more CSS classes.

```html
<div
  [class.active]="isActive"
  [class.disabled]="isDisabled">
  Button
</div>
```

Or multiple classes:

```html
<div [ngClass]="{
  active: isActive,
  warning: hasWarning,
  selected: isSelected
}">
  Item
</div>
```

---

## Attribute binding

Some CSS relies on HTML attributes.

```html
<button
  [attr.aria-disabled]="disabled"
  [attr.data-theme]="theme">
  Save
</button>
```

CSS:

```css
button[data-theme="dark"] {
  background: black;
  color: white;
}
```

---

## Host element binding

Apply styles to the component's host element.

Using the `host` metadata property (recommended):

```ts
@Component({
  selector: 'app-card',
  template: `<ng-content />`,
  host: {
    '[class.active]': 'isActive',
    '[style.border-color]': 'borderColor'
  }
})
export class CardComponent {
  isActive = true;
  borderColor = 'royalblue';
}
```

Or with `@HostBinding`:

```ts
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `Card`
})
export class CardComponent {

  @HostBinding('class.active')
  active = true;

  @HostBinding('style.background')
  background = 'lightblue';
}
```

Useful when the style belongs to the component itself rather than an internal element.

---

## Programmatic styling with `Renderer2`

Used when manipulating the DOM safely.

```ts
import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
    <div #box>Hello</div>
  `
})
export class DemoComponent {

  @ViewChild('box')
  box!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(
      this.box.nativeElement,
      'background',
      'gold'
    );

    this.renderer.addClass(
      this.box.nativeElement,
      'highlight'
    );
  }
}
```

Common methods:

| Method           | Purpose               |
| ---------------- | --------------------- |
| `setStyle()`     | Add or update a style |
| `removeStyle()`  | Remove a style        |
| `addClass()`     | Add a CSS class       |
| `removeClass()`  | Remove a CSS class    |
| `setAttribute()` | Set an attribute      |

---

# (2) Global styles

Global styles affect the entire application.

Typical location:

```text
src/
    styles.css
```

Example:

```css
html,
body {
    margin: 0;
    font-family: Roboto, sans-serif;
}

* {
    box-sizing: border-box;
}
```

Additional global files can be configured in `angular.json`.

```json
"styles": [
  "src/styles.css",
  "src/themes/dark.css"
]
```

Typical uses:

- CSS reset
- Typography
- CSS variables
- Theme definitions
- Utility classes
- Third-party library styles

---

# (3) Styling frameworks

Angular works with virtually any CSS framework.

## Angular Material (official Angular UI library)

Designed specifically for Angular and implements Material Design.

### Install

```bash
ng add @angular/material
```

The schematic can:

- Install packages
- Configure animations
- Configure theming
- Include Material Icons
- Update project configuration

Example:

```html
<button mat-raised-button color="primary">
  Save
</button>
```

Best for:

- Enterprise applications
- Admin dashboards
- Accessibility
- Responsive layouts

---

## Bootstrap

Popular responsive CSS framework.

Install:

```bash
npm install bootstrap
```

Add to `angular.json`:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
```

Example:

```html
<button class="btn btn-primary">
    Save
</button>
```

---

## Tailwind CSS

Utility-first CSS framework.

Install:

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

Configure according to the Angular 20 installation guide, then use utility classes:

```html
<button class="bg-blue-600 text-white px-4 py-2 rounded">
    Save
</button>
```

---

## PrimeNG

Comprehensive Angular component library.

Install:

```bash
npm install primeng @primeuix/themes
```

Example:

```html
<p-button label="Save"></p-button>
```

Best for:

- Data-heavy business applications
- Rich UI components

---

## NG-ZORRO

Angular implementation of Ant Design.

Install:

```bash
ng add ng-zorro-antd
```

Example:

```html
<button nz-button nzType="primary">
    Save
</button>
```

---

## Bulma

Lightweight Flexbox-based framework.

Install:

```bash
npm install bulma
```

Add to `angular.json`:

```json
"styles": [
  "node_modules/bulma/css/bulma.min.css",
  "src/styles.css"
]
```

Example:

```html
<button class="button is-primary">
    Save
</button>
```

---

## Foundation

Responsive front-end framework focused on flexibility.

Install:

```bash
npm install foundation-sites
```

Include its CSS in the global styles configuration or import it into your global stylesheet.

---

## DaisyUI

Tailwind CSS component library.

Install:

```bash
npm install daisyui
```

Example:

```html
<button class="btn btn-primary">
    Save
</button>
```

---

# (4) Summary table

| Technique / Framework  | Dynamic                    | Scoped       | Typical use                 |
| ---------------------- | -------------------------- | ------------ | --------------------------- |
| Inline metadata styles | No                         | ✅           | Small components            |
| External stylesheet    | No                         | ✅           | Standard component styling  |
| Style binding          | ✅                         | Element      | Dynamic property values     |
| Class binding          | ✅                         | Element      | Toggle classes              |
| Attribute binding      | ✅                         | Element      | Attribute-driven styling    |
| Host element binding   | ✅                         | Host element | Style the component itself  |
| Renderer2              | ✅                         | Runtime      | Safe DOM manipulation       |
| Global styles          | No                         | Entire app   | Shared styles and themes    |
| Angular Material       | Component library          | App          | Material Design UI          |
| Bootstrap              | CSS framework              | App          | Responsive layouts          |
| Tailwind CSS           | Utility framework          | App          | Utility-first styling       |
| PrimeNG                | Angular component library  | App          | Enterprise components       |
| NG-ZORRO               | Angular component library  | App          | Ant Design UI               |
| Bulma                  | CSS framework              | App          | Lightweight responsive UI   |
| Foundation             | CSS framework              | App          | Responsive web applications |
| DaisyUI                | Tailwind component library | App          | Rapid UI development        |
