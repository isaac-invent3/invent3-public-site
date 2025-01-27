import * as Yup from 'yup';
import { createDateSchema } from './general.schema';

const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current Password is Required'),
  newPassword: Yup.string().required('New Password Required'),
});

const employeeInfoSchema = Yup.object().shape({
  picture: Yup.object()
    .shape({
      imageId: Yup.number().nullable(),
      imageName: Yup.string().required(),
      base64PhotoImage: Yup.string().required(),
      base64Prefix: Yup.string().nullable(),
    })
    .required('Picture is required'),
  firstName: Yup.string().required('First name is Required'),
  middleName: Yup.string().nullable(),
  lastName: Yup.string().required('Last name is Required'),
  dob: createDateSchema(false, false).nullable(),
  mobileNumber: Yup.string().nullable(),
  personalEmail: Yup.string().nullable(),
  workEmail: Yup.string().nullable(),
  gender: Yup.string().nullable(),
  address1: Yup.string().nullable(),
  address2: Yup.string().nullable(),
  country: Yup.string().nullable(),
  state: Yup.string().nullable(),
  city: Yup.string().nullable(),
  postalCode: Yup.string().nullable(),
});

const occupationInfoSchema = Yup.object().shape({
  employmentType: Yup.string().nullable(),
  branch: Yup.string().nullable(),
  jobTitle: Yup.string().nullable(),
  team: Yup.string().nullable(),
  userRole: Yup.string().nullable(),
  userGroup: Yup.array().of(Yup.string()).nullable(),
});

export { changePasswordSchema, employeeInfoSchema, occupationInfoSchema };
