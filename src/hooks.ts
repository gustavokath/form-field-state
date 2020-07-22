import { useState, Dispatch } from 'react';
import FormFieldState from './FormFieldState';

const useFormFieldState = <S = undefined>(initialState: FormFieldState<S> = new FormFieldState<S>())
  : [FormFieldState<S>, Dispatch<S>, () => void] => {
  const [field, setField] = useState(initialState);

  const setValue = (value: S) : void => {
    const newState = Object.create(field);
    newState.setValue(value);
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
