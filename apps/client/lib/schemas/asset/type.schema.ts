import * as Yup from 'yup';

const typeSchema = Yup.object().shape({
  typeName: Yup.string().required('Name is Required'),
});

export { typeSchema };
