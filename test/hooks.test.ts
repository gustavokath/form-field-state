import 'jest';
import { useFormFieldState, FormFieldState, FORM_FIELD_NO_ERROR } from '../src';
import { FormFieldError } from '../src/FromFieldError';

const setStateFunc = jest.fn()
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn((field) => [field, setStateFunc]),
}));

const MOCK_VALUE = 'mock value'
const mockedField = new FormFieldState<string>(MOCK_VALUE)
const objectCreateSpy = jest.spyOn(Object, 'create')
objectCreateSpy.mockReturnValue(mockedField)

describe('useFormFieldState', () => {
  describe('when useFormFieldState hook is called', () => {
    it('should return standard field when no initial state', () => {
      const [field] = useFormFieldState();
      expect(field.value).toBeUndefined()
      expect(field.hasErrors).toBeFalsy()
      expect(field.errorMessage).toBeNull()
    })

    it('should return setValue function when no initial state', () => {
      const [,setValueFunc] = useFormFieldState();
      expect(setValueFunc).toBeInstanceOf(Function)
    })

    it('should return provided field when initial state', () => {
      const validateFunction = () => FORM_FIELD_NO_ERROR;
      const [field] = useFormFieldState('', validateFunction);
      expect(field.value).toEqual('');
      expect(field.validator).toEqual(validateFunction);
      expect(field.dependentFields).toEqual({});
      expect(field.hasErrors).toEqual(false);
    })
  });

  describe('when setValue function is called', () => {
    it('should call setState with new field', () => {
      const newValue = 'new value'
      const [field, setFieldValue] = useFormFieldState<string>();
      setFieldValue(newValue);
      expect(setStateFunc).toHaveBeenCalledWith(mockedField)
      expect(mockedField.value).toEqual(newValue)
    })
  })

  describe('when refresh function is called', () => {
    const error: FormFieldError = {hasErrors: true, message: 'errorMessage'}

    it('should reevaulate validators', () => {
      mockedField.validator = () => error
      const [,,refreshField] = useFormFieldState<string>();
      refreshField();
      expect(setStateFunc).toHaveBeenCalledWith(mockedField)
      expect(mockedField.hasErrors).toEqual(true)
    })
  })
})