# 25 — Next Steps

You've completed the Angular fundamentals. Here's what to explore next.

## Signals

```ts
import { Component, signal, computed, effect } from '@angular/core';

@Component({ template: `<p>{{ doubled() }}</p>` })
export class App {
  count   = signal(0);                        // writable reactive signal
  doubled = computed(() => this.count() * 2); // auto-updates when count changes

  constructor() {
    effect(() => console.log('count:', this.count())); // reactive side-effect
  }

  increment() {
    this.count.update(c => c + 1);            // update based on previous value
  }
}
```

## HTTP Client

```ts
// app.config.ts
import { provideHttpClient } from '@angular/common/http';
export const appConfig = { providers: [provideHttpClient()] };
```

```ts
// data.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);

  getItems() {
    return this.http.get<Item[]>('/api/items');   // returns an Observable
  }
}
```

## Lazy-loaded Routes

```ts
// app.routes.ts
export const routes: Routes = [
  {
    path: 'dashboard',
    // component bundle only downloaded when user navigates to /dashboard
    loadComponent: () =>
      import('./dashboard/dashboard').then(m => m.Dashboard),
  },
];
```

## Further Reading

| Topic | Link |
|---|---|
| Signals | `<https://angular.dev/guide/signals>` |
| HTTP Client | `<https://angular.dev/guide/http>` |
| Routing | `<https://angular.dev/guide/routing>` |
| Testing | `<https://angular.dev/guide/testing>` |
| Angular CLI | `<https://angular.dev/tools/cli>` |
| Full Tutorial | `<https://angular.dev/tutorials/learn-angular>` |
