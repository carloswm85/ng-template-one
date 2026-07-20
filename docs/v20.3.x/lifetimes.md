- [Service's Lifetime (Angular 20.3.x)](#services-lifetime-angular-203x)
	- [Examples](#examples)
		- [1. Application singleton (`root`)](#1-application-singleton-root)
		- [2. Platform singleton (`platform`)](#2-platform-singleton-platform)
		- [3. Per-injector (`any`)](#3-per-injector-any)
		- [4. Component-scoped service](#4-component-scoped-service)
		- [5. Route-scoped service](#5-route-scoped-service)
	- [Summary](#summary)
		- [Recommendation](#recommendation)

---

# Service's Lifetime (Angular 20.3.x)

| Provider location          | Instance lifetime                                                     | Typical use                                             |
| -------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------- |
| `providedIn: 'root'`       | **Singleton** (one instance for the entire application)               | Shared application state, APIs, authentication          |
| `providedIn: 'platform'`   | One instance per Angular platform                                     | Multiple Angular applications sharing the same platform |
| `providedIn: 'any'`        | One instance per injector (typically one per lazy-loaded environment) | Isolated instances for lazy-loaded features             |
| `providers` on a component | One instance per component instance (and its descendants)             | Component-local state                                   |
| `providers` on a route     | One instance per activated route injector                             | Route-scoped state and feature services                 |

## Examples

### 1. Application singleton (`root`)

```ts
@Injectable({
  providedIn: 'root'
})
export class AuthService {}
```

- One instance for the entire application.
- The most common pattern.

---

### 2. Platform singleton (`platform`)

```ts
@Injectable({
  providedIn: 'platform'
})
export class SharedPlatformService {}
```

- Shared across multiple Angular applications running on the same page.
- Rarely used.

---

### 3. Per-injector (`any`)

```ts
@Injectable({
  providedIn: 'any'
})
export class FeatureCacheService {}
```

- Root injector gets one instance.
- Each lazy-loaded injector receives its own instance.
- Useful for feature-specific caches.

---

### 4. Component-scoped service

```ts
@Component({
  selector: 'app-editor',
  providers: [EditorStateService],
  template: `...`
})
export class EditorComponent {}
```

Each `EditorComponent` gets its **own** `EditorStateService`.

```
Editor #1
 └── EditorStateService (A)

Editor #2
 └── EditorStateService (B)
```

---

### 5. Route-scoped service

```ts
export const routes: Routes = [
  {
    path: 'admin',
    providers: [AdminStateService],
    loadComponent: () =>
      import('./admin.component').then(m => m.AdminComponent)
  }
];
```

- A new instance is created when the route's injector is created.
- Destroyed when that route injector is destroyed.

## Summary

| Scope                    | Singleton?            |
| ------------------------ | --------------------- |
| `providedIn: 'root'`     | ✅ Yes                |
| `providedIn: 'platform'` | ✅ Yes (per platform) |
| `providedIn: 'any'`      | ❌ No                 |
| Component `providers`    | ❌ No                 |
| Route `providers`        | ❌ No                 |

### Recommendation

For most Angular **20.3.x** applications:

- ✅ Use `providedIn: 'root'` for shared application services.
- ✅ Use component providers for component-local state.
- ✅ Use route providers for feature- or route-specific state.
- ✅ Use `providedIn: 'any'` only when you specifically want separate instances across injector boundaries (such as lazy-loaded features).
