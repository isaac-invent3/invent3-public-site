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
      imageName: Yup.string().nullable(),
      base64PhotoImage: Yup.string().nullable(),
      base64Prefix: Yup.string().nullable(),
    })
    .nullable(),
  firstName: Yup.string().required('First name is Required'),
  lastName: Yup.string().required('Last name is Required'),
  mobileNumber: Yup.string().nullable(),
  workEmail: Yup.string().email().required('Work Email is Required'),
  branchId: Yup.string().required('Facility is required'),
});

const occupationInfoSchema = Yup.object().shape({
  employmentTypeId: Yup.string().nullable(),
  jobTitleId: Yup.string().nullable(),
  teamIds: Yup.array().of(Yup.number()).nullable(),
  userRoleIds: Yup.array().of(Yup.number()).min(1, 'Role is required'),
  userGroupIds: Yup.array().of(Yup.number()).nullable(),
});

const userRoleSchema = Yup.object().shape({
  roleName: Yup.string().required('Role name is required'),
  description: Yup.string().required('Description is required'),
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

const designationSchema = Yup.object().shape({
  designationTypeId: Yup.number().required('Designation Type is required'),
  designationName: Yup.string().required('Designation Name is required'),
});

export {
  changePasswordSchema,
  employeeInfoSchema,
  occupationInfoSchema,
  userRoleSchema,
  userGroupSchema,
  userIDPSchema,
  designationSchema,
};
