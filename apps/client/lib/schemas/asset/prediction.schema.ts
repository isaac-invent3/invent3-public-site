import * as Yup from 'yup';

const predictiveRiskComparisionSchema = Yup.object().shape({
  assets: Yup.array()
    .of(Yup.number())
    .required('This is required')
    .min(2, 'Select at least 2 assets'),
  type: Yup.number().required('Type is Required'),
  range: Yup.number().required('Date Period is Required'),
});

export { predictiveRiskComparisionSchema };
