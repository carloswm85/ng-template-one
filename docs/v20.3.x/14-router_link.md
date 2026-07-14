# 14 — RouterLink

Replace `href` with `routerLink` to navigate without full page reloads.

```ts
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <!-- routerLink prevents full page reload; href would reload the browser -->
      <a routerLink="/">Home</a>  |
      <a routerLink="/user">User</a>
    </nav>
    <router-outlet />
  `,
  imports: [RouterLink, RouterOutlet],   // both must be imported
})
export class App {}
```
