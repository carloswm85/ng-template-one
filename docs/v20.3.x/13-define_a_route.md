# 13 — Define a Route

Each route object maps a URL `path` to a `component`. Add `title` to set the browser tab title automatically.

```ts
// app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { User } from './user/user';

export const routes: Routes = [
  {
    path: '',           // matches "/" — default route
    title: 'App Home Page',
    component: Home,
  },
  {
    path: 'user',       // matches "/user"
    title: 'App User Page',
    component: User,
  },
];
```
