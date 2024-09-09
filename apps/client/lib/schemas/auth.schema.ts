import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  // email: Yup.string().email('Invalid Email Adress').required('Email Required'),
  username: Yup.string().required('Username is Required'),
  password: Yup.string().required(' Password Required'),
});
