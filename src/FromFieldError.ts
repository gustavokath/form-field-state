export type FormFieldError = {
  hasErrors: boolean,
  message: string | null
};

export const FORM_FIELD_NO_ERROR : FormFieldError = {
  hasErrors: false,
  message: null,
};
