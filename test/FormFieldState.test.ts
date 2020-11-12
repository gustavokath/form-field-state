import 'jest';
import { FormFieldState, FormFieldError, FORM_FIELD_NO_ERROR } from '../src';

describe('FormFielsState', () => {
  describe('validate', () => {
    test('should call validator with object', () => {
      const validatorFuncMock = jest.fn(() => FORM_FIELD_NO_ERROR);
      const field = new FormFieldState('value', validatorFuncMock);
      field.validate();
      expect(validatorFuncMock).toBeCalledWith(field);
    });

    test('should call default validator', () => {
      const field = new FormFieldState('value');
      field.validate();
      expect(field).toEqual(field);
    });
  });

  describe('setValue', () => {
    test('should change value to new value', () => {
      const field = new FormFieldState('value');
      field.validate = jest.fn();
      field.setValue('newValue');
      expect(field.value).toEqual('newValue');
    });

    test('should call validate function when value changes', () => {
      const validateFuncMock = jest.fn(() => FORM_FIELD_NO_ERROR);
      const field = new FormFieldState('value');
      field.validate = validateFuncMock;
      field.setValue('newValue');
      expect(validateFuncMock).toBeCalled();
    });

    test('should set error when validator has error validate function when value changes', () => {
      const validateFuncMock = jest.fn(() => ({hasErrors: true, message: 'Error'}));
      const field = new FormFieldState('value');
      field.validate = validateFuncMock;
      field.setValue('newValue');
      expect(validateFuncMock).toBeCalled();
      expect(field.hasErrors).toBeTruthy();
    });

    test('should not call validate function when same value', () => {
      const validateFuncMock = jest.fn(() => FORM_FIELD_NO_ERROR);
      const field = new FormFieldState('value');
      field.validate = validateFuncMock;
      field.setValue('value');
      expect(validateFuncMock).not.toBeCalled();
    });

    test('should not set error when validator has error validate function when same value', () => {
      const validateFuncMock = jest.fn(() => ({hasErrors: true, message: 'Error'}));
      const field = new FormFieldState('value');
      field.validate = validateFuncMock;
      field.setValue('value');
      expect(validateFuncMock).not.toBeCalled();
      expect(field.hasErrors).toBeFalsy();
    });
  });

  describe('refresh', () => {
    const error: FormFieldError = {hasErrors: true, message: 'errorMessage'}

    test('should change hasErrors with received value', () => {
      const field = new FormFieldState('value', () => error, undefined, false, null);
      field.refresh();
      expect(field.hasErrors).toEqual(true);
    });

    test('should change errorMessage with received value', () => {
      const field = new FormFieldState('value', () => error, undefined, false, null);
      field.refresh();
      expect(field.errorMessage).toEqual('errorMessage');
    });
  });

  describe('dependent fields', () => {
    test('should have dependent field available', () => {
      const dependentField = new FormFieldState('value', undefined, undefined, false, null);
      const field = new FormFieldState('value', undefined, {depedency1: dependentField}, false, null);
      expect(field.dependentFields).toEqual({depedency1: dependentField})
    })
  })
});
