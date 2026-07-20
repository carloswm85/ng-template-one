# 10 — Deferrable Views

Use `@defer` to lazy-load heavy components, reducing the initial bundle and improving performance.

```ts
import { Component } from '@angular/core';
import { Comments } from './comments';

@Component({
  selector: 'app-root',
  template: `
    <article>
      <p>Blog post content...</p>
    </article>

    <!-- lazy-loads Comments when it scrolls into the viewport -->
    @defer (on viewport) {
      <comments />

    } @placeholder {
      <!-- shown before deferred loading starts; eagerly loaded -->
      <p>Future comments</p>

    } @loading (minimum 2s) {
      <!-- shown while fetching; minimum prevents flicker on fast loads -->
      <p>Loading comments...</p>
    }
  `,
  imports: [Comments],
})
export class App {}
```

**Available triggers:**

| Trigger          | Loads when…                        |
| ---------------- | ---------------------------------- |
| `on idle`        | Browser is idle (default)          |
| `on viewport`    | Element enters the viewport        |
| `on interaction` | User clicks or focuses the element |
| `on hover`       | User hovers over the element       |
| `on timer(2s)`   | After a fixed delay                |
| `when condition` | Expression becomes truthy          |
