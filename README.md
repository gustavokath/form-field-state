# Form Field State

Control your fields states and properties made with React

## Install

```sh
$ yarn add form-field-state
# or
$ npm install form-field-state --save
```

## Usage

### Simple Usage - Value Only

```tsx
import {useFormFieldState, FormFieldState} from 'form-field-state';

const YourComponent = () => {
  const [field, setFieldValue] = useFormFieldState(new FormFieldState<string>(''))

  return (
    <form>
      <input value={field.value} onChange={(e) => setFieldValue(e.target.value)}>
    </form>
  )
}
```

### Validators Usage - Value Only

```tsx
import {useFormFieldState, FormFieldState, FORM_FIELD_NO_ERROR} from 'form-field-state';

const fieldValidator = (field: FormFieldState<string>) => {
  if(!field.valeu && field.value !== ''){
    return {
      hasErros: true,
      message: 'Empty value'
    } as
  }

  return FORM_FIELD_NO_ERROR;
}

const YourComponent = () => {
  const [field, setFieldValue] = useFormFieldState(new FormFieldState<string>('', fieldValidator))

  return (
    <form>
      <input value={field.value} onChange={(e) => setFieldValue(e.target.value)}>
    </form>
  )
}
```

## useFormFieldState Hook

The `useFormFieldState` hook encapsulated the useState hook, so it follows the same return approach, once the hook is executed it will return the field provided to the hook and also a function that will update the field value. During the value update some actions are executed in the following order:

1. A new `FormFieldState` object is created
2. The new value is set to the `FormFieldState.value`
3. The validators are executed and `hasErrors`, `errorMessage` updated
4. The field React state is computed

## Validators

The `FormFieldState` has the concept of validators implemented, so on every field value change the validators are executed and the `hasErrors` and `errorMessage` attributes are updated to match the current value state.

Your own validator can be any function that received a `FormFieldState<T>` and return a `FormFieldError`

## API

### FormFieldState

```ts
type FormFieldState<T> ={
  value: T | undefined;
  validator: (field: FormFieldState<T>) => FormFieldError;
  dependentFields: DependentFieldMap;
  hasErrors: boolean;
  errorMessage: string | null;
}
```

### FormFieldError

```ts
type FormFieldError = {
  hasErrors: boolean,
  message: string | null
};
```

### DependentFieldMap

```ts
type DependentFieldMap = {
  [key: string]: FormFieldState<any>
};
```

## Issues

Create GitHub Issues reporting the bug or feature request

## License

MIT @ Gustavo Kath
