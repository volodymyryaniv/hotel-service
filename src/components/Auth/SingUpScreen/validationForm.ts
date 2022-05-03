import * as Yup from 'yup';

export const initialValuesNewUser = {
  email: '',
  fullName: '',
  password: '',
  confirmPassword: '',
};

export const formNewUserValidation = Yup.object().shape({
  email: Yup.string().email().required('Enter valid email'),
  fullName: Yup.string()
    .matches(
      /(^([^a-zа-я]|[A-Z]).*\s){1,}/g,
      'Should contain min two words with Upper start letter',
    )
    .required('Please enter full name'),
  password: Yup.string()
    .min(12, 'Min length 12 symbols')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/,
      'Please valid password. One uppercase, one lowercase, one special character and no spaces',
    )
    .required('The field is required'),
  confirmPassword: Yup.string()
    .required('The field is required')
    .test('password-match', 'Password musth match', function match(value) {
      return this.parent.password === value;
    }),
});
