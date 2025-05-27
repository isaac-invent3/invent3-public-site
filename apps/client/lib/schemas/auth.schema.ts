import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email Adress').required('Email Required'),
  password: Yup.string().required('Password Required'),
});

const twoFASchema = Yup.object().shape({
  code: Yup.string().required('Code is Required'),
});

export { loginSchema, twoFASchema };
