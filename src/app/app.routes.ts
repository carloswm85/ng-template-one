import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
    canActivate: [loggedGuard],
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./features/articles/articles.routes').then(
        (m) => m.ARTICLES_ROUTES,
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
];
