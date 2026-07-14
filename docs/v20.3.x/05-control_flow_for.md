# 05 — Control Flow: `@for`

Use `@for` to repeat elements over an iterable. `track` is **required** and must uniquely identify each item.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    @for (user of users; track user.id) {
      <p>{{ user.name }}</p>             <!-- rendered once per user -->
    }
  `,
})
export class App {
  users = [
    { id: 0, name: 'Sarah' },
    { id: 1, name: 'Amy' },
    { id: 2, name: 'Rachel' },
    { id: 3, name: 'Jessica' },
    { id: 4, name: 'Poornima' },
  ];
}
```

> `@for` also exposes context variables: `$index`, `$first`, `$last`, `$even`, `$odd`.
