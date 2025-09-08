import * as Yup from 'yup';

const teamSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

export { teamSchema };
