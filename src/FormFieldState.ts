import { FormFieldError, FORM_FIELD_NO_ERROR } from './FromFieldError';

export type DependentFieldMap = {
  [key: string]: FormFieldState<any>
};

class FormFieldState<T> {
  private defaultValidator = () : FormFieldError => FORM_FIELD_NO_ERROR;

  value: T | undefined;

  validator: (field: FormFieldState<T>) => FormFieldError;

  dependentFields: DependentFieldMap;

  hasErrors: boolean;

  errorMessage: string | null;

  constructor(value?: T | undefined, validator?: (field: FormFieldState<T>) => FormFieldError,
    dependentFields: DependentFieldMap = {}, hasError = false, errorMessage: string | null = null) {
    this.value = value;
    this.validator = validator || this.defaultValidator;
    this.dependentFields = dependentFields;
    this.hasErrors = hasError;
    this.errorMessage = errorMessage;
  }

  public validate(): FormFieldError {
    return this.validator(this);
  }

  public setValue(newValue: T): void {
    const currentValue = this.value;
    this.value = newValue;

    if (currentValue !== newValue) {
      this.updateErros(this.validate());
    }
  }

  public refresh() {
    return this.updateErros(this.validate());
  }

  private updateErros(error: FormFieldError) {
    if (error) {
      this.hasErrors = error.hasErrors;
      this.errorMessage = error.message;
    }
  }
}

export default FormFieldState;
