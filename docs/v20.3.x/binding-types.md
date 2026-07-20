- [Angular bindings (Angular 20.3.x)](#angular-bindings-angular-203x)
	- [Core binding types](#core-binding-types)
	- [Additional binding types](#additional-binding-types)
	- [Signals in Angular](#signals-in-angular)
	- [Angular 20.3.x recommendations](#angular-203x-recommendations)

---

# Angular bindings (Angular 20.3.x)

## Core binding types

| Syntax             | Binding name         | Direction       | Description                                                      | Example               |
| ------------------ | -------------------- | --------------- | ---------------------------------------------------------------- | --------------------- |
| `[property]`       | **Property Binding** | Component → DOM | Binds a component property to a DOM property or component input. | `[src]="imageUrl"`    |
| `(event)`          | **Event Binding**    | DOM → Component | Listens to DOM or component events.                              | `(click)="onClick()"` |
| `{{ expression }}` | **Interpolation**    | Component → DOM | Renders text content from an expression.                         | `{{ user.name }}`     |
| `[(ngModel)]`      | **Two-Way Binding**  | Component ↔ DOM | Synchronizes form control values (requires `FormsModule`).       | `[(ngModel)]="name"`  |

---

## Additional binding types

| Syntax                   | Name                            | Target             | Description                                                         | Example                     |
| ------------------------ | ------------------------------- | ------------------ | ------------------------------------------------------------------- | --------------------------- |
| `[attr.name]`            | **Attribute Binding**           | HTML attribute     | Sets HTML attributes that do not have corresponding DOM properties. | `[attr.aria-label]="label"` |
| `[class.name]`           | **Class Binding**               | CSS class          | Adds or removes a single CSS class.                                 | `[class.active]="isActive"` |
| `[class]`                | **Class Map Binding**           | CSS classes        | Binds multiple CSS classes from a string, array, or object.         | `[class]="classMap"`        |
| `[style.prop]`           | **Style Binding**               | Inline style       | Sets a single CSS style property.                                   | `[style.color]="color"`     |
| `[style]`                | **Style Map Binding**           | Inline styles      | Sets multiple inline styles.                                        | `[style]="styleMap"`        |
| `@Input()` / `input()`   | **Input Binding**               | Child component    | Receives data from a parent component.                              | `[title]="pageTitle"`       |
| `@Output()` / `output()` | **Output Binding**              | Parent component   | Emits events from a child component.                                | `(saved)="onSave($event)"`  |
| `model()`                | **Model Binding**               | Parent ↔ Child     | Declares a writable model input that supports two-way binding.      | `[(value)]="count"`         |
| `#ref`                   | **Template Reference Variable** | DOM/component      | Creates a local reference to an element, directive, or component.   | `#input`                    |
| `@if`, `@for`, `@switch` | **Built-in Control Flow**       | Template structure | Conditionally or repeatedly renders template content.               | `@if (loggedIn) { ... }`    |

---

## Signals in Angular

Signals are **not a template binding syntax**. Instead, they are a reactive state primitive whose values are consumed through existing bindings.

```ts
readonly count = signal(0);
```

```html
<p>{{ count() }}</p>

<button (click)="count.update(v => v + 1)">
  Increment
</button>

<div [class.active]="count() > 0">
  Active
</div>
```

Signals can be used with:

- Interpolation (`{{ count() }}`)
- Property binding (`[disabled]="isLoading()"`)
- Class binding (`[class.active]="isActive()"`)
- Style binding (`[style.color]="color()"`)
- Control flow (`@if (show()) { ... }`, `@for (...)`)

---

## Angular 20.3.x recommendations

| Feature                  | Status                                                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `input()`                | ✅ Stable and recommended for new components                                                                                 |
| `output()`               | ✅ Stable and recommended for new components                                                                                 |
| `model()`                | ✅ Stable for component two-way binding                                                                                      |
| Signals                  | ✅ Preferred reactive state model                                                                                            |
| `@if`, `@for`, `@switch` | ✅ Preferred over `*ngIf`, `*ngFor`, `*ngSwitch` for new code                                                                |
| `@let`                   | ✅ Stable                                                                                                                    |
| `@Input()` / `@Output()` | ✅ Fully supported; still appropriate for existing code                                                                      |
| `[(ngModel)]`            | ✅ Supported for template-driven forms; Reactive Forms or signal-based patterns are generally preferred for new applications |

Overall, your original document was about **90–95% accurate**. The primary corrections are treating **signals as state rather than a binding type**, updating **structural directives** to the **new control flow syntax**, and clarifying the relationship between **`model()`** and Angular's existing two-way binding syntax.
