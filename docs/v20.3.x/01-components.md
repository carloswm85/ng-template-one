# 01 — Components in Angular

Every Angular app is built from **components**. Each component has three parts: a TypeScript class, an HTML template, and CSS styles.

```ts
@Component({
  selector: 'app-root',
  template: `
    Hello Universe       <!-- inline HTML template -->
  `,
  styles: `
    :host {
      color: #a144eb;    /* :host targets the component's own root element */
    }
  `,
})
export class App {}
```

> Template and styles can also live in separate files:

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  // external template file
  styleUrl:    './app.component.css',   // external styles file
})
export class App {}
```
