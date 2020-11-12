import { useState, Dispatch } from 'react';
import FormFieldState, { DependentFieldMap } from './FormFieldState';
import { FormFieldError } from './FromFieldError';

const useFormFieldState = <S = undefined>(
  value?: S | undefined,
  validator?: (field: FormFieldState<S>) => FormFieldError,
  dependentFields: DependentFieldMap = {},
) : [FormFieldState<S>, Dispatch<S>, () => void] => {
  const formFieldInitialState = new FormFieldState(value, validator, dependentFields);
  const [field, setField] = useState(formFieldInitialState);

  const setValue = (newValue: S) : void => {
    const newState = Object.create(field);
    newState.setValue(newValue);
    setField(newState);
  };

  const refresh = () : void => {
    const newState : FormFieldState<S> = Object.create(field);
    newState.refresh();
    setField(newState);
  };

  return [field, setValue, refresh];
};

export default useFormFieldState;
