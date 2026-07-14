# 22 — Pipes

Pipes transform data in templates using the `|` operator. Import and add them to `imports` before use.

```ts
import { Component } from '@angular/core';
import { UpperCasePipe, LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <!-- pipe name is used after | in the template -->
    <p>{{ loudMessage | uppercase }}</p>   <!-- WE THINK YOU ARE DOING GREAT! -->
    <p>{{ username | lowercase }}</p>      <!-- sarah -->
  `,
  imports: [UpperCasePipe, LowerCasePipe],  // add each pipe to imports
})
export class App {
  loudMessage = 'we think you are doing great!';
  username    = 'Sarah';
}
```

> Pipes are **pure** by default — they only re-run when the input reference changes.
