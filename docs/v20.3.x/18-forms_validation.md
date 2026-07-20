# 18 — Validating Forms

Pass `Validators` to `FormControl` to enforce rules. Use `FormGroup.valid` to gate submission.

```ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">

      <label>Name
        <input type="text" formControlName="name" />
      </label>

      <label>Email
        <input type="email" formControlName="email" />
      </label>

      <!-- button disabled while form is invalid -->
      <button type="submit" [disabled]="!profileForm.valid">Submit</button>

    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class App {
  profileForm = new FormGroup({
    name:  new FormControl('', Validators.required),               // single validator
    email: new FormControl('', [Validators.required,
                                Validators.email]),                // multiple validators
  });

  handleSubmit() {
    if (this.profileForm.valid) {
      alert(this.profileForm.value.name + ' | ' + this.profileForm.value.email);
    }
  }
}
```

**Built-in validators:**

| Validator                   | Description                  |
| --------------------------- | ---------------------------- |
| `Validators.required`       | Field must not be empty      |
| `Validators.email`          | Must be a valid email format |
| `Validators.minLength(n)`   | Minimum character count      |
| `Validators.maxLength(n)`   | Maximum character count      |
| `Validators.pattern(regex)` | Must match a regex           |
| `Validators.min(n)`         | Minimum numeric value        |
| `Validators.max(n)`         | Maximum numeric value        |
