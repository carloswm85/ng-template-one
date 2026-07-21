- [Angular 20.3.x — Styling Techniques \& Frameworks](#angular-203x--styling-techniques--frameworks)
	- [1. Inline Metadata Styles](#1-inline-metadata-styles)
	- [2. External Stylesheets (`styleUrl` / `styleUrls`)](#2-external-stylesheets-styleurl--styleurls)
	- [3. Style Binding \& Class Binding](#3-style-binding--class-binding)
	- [4. Host Element Binding](#4-host-element-binding)
	- [5. Programmatic Styling with `Renderer2`](#5-programmatic-styling-with-renderer2)
	- [6. View Encapsulation](#6-view-encapsulation)
	- [7. CSS `@layer` (Modern Cascade Management)](#7-css-layer-modern-cascade-management)
	- [8. Global Styles](#8-global-styles)
	- [Styling Frameworks — Integration Guide](#styling-frameworks--integration-guide)
		- [Angular Material (Recommended First Choice)](#angular-material-recommended-first-choice)
		- [Tailwind CSS v4](#tailwind-css-v4)
		- [PrimeNG v20](#primeng-v20)
		- [Bootstrap 5](#bootstrap-5)
		- [UnoCSS](#unocss)
	- [Summary Comparison](#summary-comparison)

---

> Explanation generated with Claude

# Angular 20.3.x — Styling Techniques & Frameworks

---

## 1. Inline Metadata Styles

Styles declared directly in the `@Component` decorator. Best for small, self-contained components.

```typescript
@Component({
  selector: 'app-card',
  template: `<div class="card">Hello</div>`,
  styles: [`
    .card {
      border-radius: 8px;
      padding: 1rem;
      background: var(--surface-ground);
    }
  `]
})
export class CardComponent {}
```

> ✅ Zero extra files. ⚠️ Not suitable for complex style sets.

---

## 2. External Stylesheets (`styleUrl` / `styleUrls`)

Link to `.css`, `.scss`, `.sass`, or `.less` files. Preferred for most components.

```typescript
// Single file (Angular 17+)
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'   // singular — preferred in v20
})
export class HeroComponent {}

// Multiple files (still valid)
@Component({
  styleUrls: ['./hero.base.scss', './hero.theme.scss']
})
export class HeroComponent {}
```

> ✅ Separation of concerns, SCSS/Sass full support.

---

## 3. Style Binding & Class Binding

Dynamic styling driven by component state, applied directly in the template.

```html
<!-- [style] object binding -->
<div [style]="{ color: isActive ? 'green' : 'gray', fontWeight: 'bold' }">Status</div>

<!-- [style.property] single value -->
<p [style.font-size.px]="fontSize">Resizable text</p>

<!-- [class] toggle -->
<button [class.active]="isActive" [class.disabled]="!isEnabled">Click</button>

<!-- [ngClass] multiple conditions -->
<div [ngClass]="{ 'alert': hasError, 'success': isValid }">Feedback</div>
```

> ✅ Reactive and signal-driven. Works seamlessly with Angular Signals (v20 default).

---

## 4. Host Element Binding

Apply styles directly to the component's host element, without wrapper `<div>`s.

```typescript
@Component({
  selector: 'app-badge',
  template: `<ng-content />`,
  host: {
    '[class.pill]': 'pill()',
    '[style.background]': 'color()',
  }
})
export class BadgeComponent {
  pill = input<boolean>(false);
  color = input<string>('#0070f3');
}
```

```scss
// In component stylesheet
:host {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
}

:host(.pill) {
  border-radius: 9999px;
}
```

> ✅ Clean DOM, no extra wrappers. Aligns with Angular 20 `host` metadata pattern.

---

## 5. Programmatic Styling with `Renderer2`

Manipulate styles at runtime without direct DOM access. SSR-safe.

```typescript
import { Component, ElementRef, Renderer2, inject, afterRender } from '@angular/core';

@Component({ selector: 'app-dynamic', template: `<span #label>Dynamic</span>` })
export class DynamicComponent {
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  applyTheme(isDark: boolean): void {
    const target = this.el.nativeElement.querySelector('span');
    this.renderer.setStyle(target, 'color', isDark ? '#e2e8f0' : '#1a202c');
    this.renderer.addClass(target, isDark ? 'dark-label' : 'light-label');
  }
}
```

> ✅ Safe for SSR / Angular Universal. Preferred over `nativeElement.style` direct access.

---

## 6. View Encapsulation

Angular provides four view encapsulation modes: `Emulated`, `ShadowDom`, `ExperimentalIsolatedShadowDom`, and `None`, configurable via the `@Component` decorator.

| Mode                            | Behavior                                         | Use Case                       |
| ------------------------------- | ------------------------------------------------ | ------------------------------ |
| `Emulated` _(default)_          | Adds scoped attribute selectors (`_ngcontent-*`) | Most components                |
| `None`                          | Styles become global                             | Shared/layout components       |
| `ShadowDom`                     | Native browser Shadow DOM isolation              | True encapsulation needed      |
| `ExperimentalIsolatedShadowDom` | Stricter Shadow DOM, CSS variables required      | Preview — targeting Angular 21 |

```typescript
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-isolated',
  encapsulation: ViewEncapsulation.ShadowDom,   // or .None / .Emulated
  styles: [`:host { display: block; }`]
})
export class IsolatedComponent {}
```

> ⚠️ `ExperimentalIsolatedShadowDom` was reverted in 20.2 and is targeting Angular 21.

---

## 7. CSS `@layer` (Modern Cascade Management)

With Angular 20 and modern CSS layers, styles can now be organized without `!important` wars — every layer knows its place in the cascade.

```css
/* styles.css */
@layer base, components, utilities, overrides;

@layer base {
  body { margin: 0; font-family: sans-serif; }
}

@layer components {
  .card { padding: 1rem; border-radius: 8px; }
}

@layer utilities {
  .mt-4 { margin-top: 1rem; }
}
```

> ✅ Recommended pattern for Angular 20+ apps with third-party UI libraries.

---

## 8. Global Styles

Styles in `styles.css` / `styles.scss` (root), referenced in `angular.json`.

```json
// angular.json
"styles": [
  "src/styles.scss",
  "node_modules/some-lib/dist/styles.css"
]
```

```scss
/* styles.scss */
:root {
  --primary: #6200ee;
  --surface: #1e1e2e;
}

* { box-sizing: border-box; }
```

> ✅ Ideal for CSS custom properties (design tokens), resets, and typography.

---

## Styling Frameworks — Integration Guide

### Angular Material (Recommended First Choice)

Official Angular UI component library with M3 theming, signal-based APIs in v20.

```bash
ng add @angular/material
```

```typescript
// app.config.ts
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimationsAsync()]
};
```

```scss
// styles.scss
@use '@angular/material' as mat;

$theme: mat.define-theme((
  color: (
    theme-type: dark,
    primary: mat.$violet-palette,
  ),
  typography: (font-family: 'Inter, sans-serif'),
));

html {
  @include mat.all-component-themes($theme);
}
```

> ✅ Tightest Angular integration. M3 tokens, `signal`-based forms, full A11y.

---

### Tailwind CSS v4

Utility-first CSS framework. In v4, configuration moves entirely into CSS (no `tailwind.config.js`).

```bash
npm install tailwindcss @tailwindcss/vite
```

```css
/* styles.css */
@import "tailwindcss";
```

```typescript
// vite.config (or angular.json builder config)
// For Angular 20 with esbuild, use @tailwindcss/vite plugin
```

> ✅ Pairs well with Signals-based components. No JS config in v4 — pure CSS.

---

### PrimeNG v20

PrimeNG provides a wide range of highly accessible, feature-rich UI components and offers official integration with Tailwind CSS via the `tailwindcss-primeui` plugin.

```bash
npm install primeng primeicons
npm install tailwindcss-primeui   # optional TW integration
```

```typescript
// app.config.ts
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: { name: 'primeng', order: 'tailwind, primeng' }
        }
      }
    })
  ]
};
```

```css
/* styles.css — with Tailwind */
@use "primeicons/primeicons.css";
@use "tailwindcss";
@plugin 'tailwindcss-primeui';
@layer tailwind, primeng;
```

> ✅ CSS `@layer` ordering prevents specificity conflicts between Tailwind and PrimeNG.

---

### Bootstrap 5

Classic component framework. Include via CDN or npm.

```bash
npm install bootstrap @popperjs/core
```

```json
// angular.json
"styles": ["node_modules/bootstrap/dist/css/bootstrap.min.css"],
"scripts": ["node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"]
```

> ⚠️ No official Angular-aware theming. Consider `ng-bootstrap` for native Angular components.

---

### UnoCSS

Atomic CSS engine — faster than Tailwind, on-demand generation, highly configurable.

```bash
npm install -D unocss @unocss/vite
```

```typescript
// vite.config.ts
import UnoCSS from '@unocss/vite';
export default { plugins: [UnoCSS()] };
```

```css
/* styles.css */
@import "uno.css";
```

> ✅ Zero-overhead, instant utilities. Great for Angular 20 esbuild pipelines.

---

## Summary Comparison

| Framework            | Angular Integration | Theming System         | Bundle Impact | Best For                   |
| -------------------- | ------------------- | ---------------------- | ------------- | -------------------------- |
| **Angular Material** | ⭐ Native           | M3 Design Tokens       | Medium        | Enterprise / Google Design |
| **PrimeNG**          | ⭐ Native           | Presets (`Aura`, etc.) | Medium-Large  | Rich data-heavy UIs        |
| **Tailwind CSS v4**  | ✅ Plugin           | CSS-native config      | Low (purged)  | Utility-first custom UIs   |
| **Bootstrap 5**      | ⚠️ Manual           | Sass variables         | Medium        | Rapid prototyping          |
| **UnoCSS**           | ✅ Plugin           | Presets + custom       | Very Low      | Performance-critical apps  |
