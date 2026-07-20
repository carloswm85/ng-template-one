- [Angular Validators (Angular 20.3.x)](#angular-validators-angular-203x)
	- [Built-in validators](#built-in-validators)
	- [Example](#example)
	- [Custom validators](#custom-validators)
	- [Simple custom validator](#simple-custom-validator)
	- [Validator with parameters](#validator-with-parameters)
	- [Cross-field validator (FormGroup)](#cross-field-validator-formgroup)
	- [Asynchronous validator](#asynchronous-validator)
	- [Validation errors](#validation-errors)
	- [Signals and forms](#signals-and-forms)
	- [Summary](#summary)

---

# Angular Validators (Angular 20.3.x)

Angular Reactive Forms provide both **built-in validators** (via the `Validators` class) and **custom validators** that you can create yourself.

Validators can be:

- **Synchronous** (`ValidatorFn`)
- **Asynchronous** (`AsyncValidatorFn`)

---

## Built-in validators

| Validator                        | Description                               | Applies to       |
| -------------------------------- | ----------------------------------------- | ---------------- |
| `Validators.required`            | Value must not be empty                   | Any control      |
| `Validators.requiredTrue`        | Value must be `true`                      | Checkbox, toggle |
| `Validators.email`               | Valid email address                       | Text             |
| `Validators.minLength(n)`        | Minimum number of characters              | String, array    |
| `Validators.maxLength(n)`        | Maximum number of characters              | String, array    |
| `Validators.pattern(regex)`      | Must match a regular expression           | String           |
| `Validators.min(n)`              | Minimum numeric value                     | Number           |
| `Validators.max(n)`              | Maximum numeric value                     | Number           |
| `Validators.nullValidator`       | Always returns `null` (always valid)      | Any control      |
| `Validators.compose([...])`      | Combines multiple synchronous validators  | Any control      |
| `Validators.composeAsync([...])` | Combines multiple asynchronous validators | Any control      |

> `compose()` and `composeAsync()` are utility methods for combining validators rather than validators that enforce validation rules themselves.

---

## Example

```ts
import { FormControl, Validators } from '@angular/forms';

username = new FormControl<string>('', {
  nonNullable: true,
  validators: [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern(/^[a-zA-Z0-9_]+$/)
  ]
});
```

---

## Custom validators

A custom validator is typically implemented as a `ValidatorFn`.

It receives an `AbstractControl` and returns either:

- `null` → valid ✅
- a `ValidationErrors` object → invalid ❌

---

## Simple custom validator

```ts
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export const noSpacesValidator: ValidatorFn =
  (control: AbstractControl): ValidationErrors | null => {

    return control.value?.includes(' ')
      ? { noSpaces: true }
      : null;
  };
```

Usage:

```ts
username = new FormControl<string>('', {
  nonNullable: true,
  validators: [
    Validators.required,
    noSpacesValidator
  ]
});
```

---

## Validator with parameters

A validator can also be implemented as a factory function.

Example: forbid a specific word.

```ts
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export function forbiddenWord(word: string): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    return control.value?.includes(word)
      ? { forbiddenWord: word }
      : null;
  };
}
```

Usage:

```ts
title = new FormControl<string>('', {
  nonNullable: true,
  validators: [
    forbiddenWord('admin')
  ]
});
```

---

## Cross-field validator (FormGroup)

Sometimes validation depends on multiple controls.

Example: password confirmation.

```ts
import {
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn =
  (group): ValidationErrors | null => {

    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    return password === confirm
      ? null
      : { passwordMismatch: true };
  };
```

Usage:

```ts
form = new FormGroup(
  {
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  },
  {
    validators: passwordMatchValidator
  }
);
```

---

## Asynchronous validator

Asynchronous validators are useful when validation requires a server request.

```ts
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';

import { delay, map, of } from 'rxjs';

export function usernameTakenValidator(): AsyncValidatorFn {

  return (control: AbstractControl) => {

    return of(['admin', 'root']).pipe(
      delay(500),
      map(users =>
        users.includes(control.value)
          ? { usernameTaken: true }
          : null
      )
    );
  };
}
```

Usage:

```ts
username = new FormControl<string>('', {
  nonNullable: true,
  validators: [
    Validators.required
  ],
  asyncValidators: [
    usernameTakenValidator()
  ]
});
```

---

## Validation errors

Every validator returns an error object with a key you can inspect.

| Validator       | Error object                                                  |
| --------------- | ------------------------------------------------------------- |
| `required`      | `{ required: true }`                                          |
| `requiredTrue`  | `{ required: true }`                                          |
| `email`         | `{ email: true }`                                             |
| `minLength(3)`  | `{ minlength: { requiredLength: 3, actualLength: 2 } }`       |
| `maxLength(10)` | `{ maxlength: { requiredLength: 10, actualLength: 15 } }`     |
| `min(18)`       | `{ min: { min: 18, actual: 15 } }`                            |
| `max(100)`      | `{ max: { max: 100, actual: 150 } }`                          |
| `pattern(...)`  | `{ pattern: { requiredPattern: "...", actualValue: "..." } }` |
| Custom          | Whatever object you return, e.g. `{ passwordMismatch: true }` |

You can access these through the control:

```ts
const errors = control.errors;

if (errors?.['required']) {
  // Required validation failed
}

if (errors?.['passwordMismatch']) {
  // Custom validator failed
}
```

---

## Signals and forms

Angular Signals do not replace the Reactive Forms validation API.

Validators work exactly the same regardless of whether the component uses:

- Signals
- Standard class properties
- RxJS

Signals can be used to consume form state (for example, using `toSignal()`), but validators continue to use the Reactive Forms API.

---

## Summary

| Validator type                              | Built into Angular | Reusable | Can access other controls | Async |
| ------------------------------------------- | ------------------ | -------- | ------------------------- | ----- |
| Built-in validators                         | ✅                 | ✅       | ❌                        | ❌    |
| Custom validator (`ValidatorFn`)            | ❌                 | ✅       | ❌                        | ❌    |
| Custom async validator (`AsyncValidatorFn`) | ❌                 | ✅       | ❌                        | ✅    |
| Custom `FormGroup` validator                | ❌                 | ✅       | ✅                        | ❌    |
| Custom async `FormGroup` validator          | ❌                 | ✅       | ✅                        | ✅    |

In practice, applications typically use the built-in validators for common field constraints (required, length, pattern, and numeric ranges), while custom validators implement business-specific rules such as password confirmation, unique usernames, valid date ranges, or domain-specific validation logic.
