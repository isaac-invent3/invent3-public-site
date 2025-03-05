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
  workEmail: Yup.string().nullable(),
  gender: Yup.string().nullable(),
  countryId: Yup.number().nullable(),
  stateId: Yup.number().nullable(),
  cityId: Yup.number().nullable(),
});

const occupationInfoSchema = Yup.object().shape({
  employmentTypeId: Yup.string().nullable(),
  branchId: Yup.string().nullable(),
  jobTitleId: Yup.string().nullable(),
  teamId: Yup.array().of(Yup.number()).nullable(),
});

const roleGroupInfoSchema = Yup.object().shape({
  userRoleIds: Yup.array().of(Yup.number()).min(1, 'Role is required'),
  userGroupIds: Yup.array().of(Yup.number()).nullable(),
});

const userRoleSchema = Yup.object().shape({
  roleName: Yup.string().required('Role name is required'),
});

const userIDPSchema = Yup.object().shape({
  employeeId: Yup.number().required('Employee is required'),
});

const userGroupSchema = Yup.object().shape({
  groupName: Yup.string().required('Group name is required'),
  userIds: Yup.array()
    .of(Yup.number())
    .required('Users is required')
    .min(1, 'Users is required'),
  roleIds: Yup.array()
    .of(Yup.number())
    .required('Roles is required')
    .min(1, 'Roles is required'),
});

export {
  changePasswordSchema,
  employeeInfoSchema,
  occupationInfoSchema,
  userRoleSchema,
  userGroupSchema,
  roleGroupInfoSchema,
  userIDPSchema,
};
