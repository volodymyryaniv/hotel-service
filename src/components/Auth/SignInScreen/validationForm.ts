import * as Yup from 'yup';

export const initialValues = {
  email: '',
  password: '',
};

export const formValidation = Yup.object().shape({
  email: Yup.string().email().required('The field is required'),
  password: Yup.string().required('The field is required'),
});
