import * as Yup from 'yup';
import { createDateSchema } from '../general.schema';

const companyInfoSchema = (validateUser: boolean) =>
  Yup.object().shape({
    companyLogo: Yup.object()
      .shape({
        imageId: Yup.number().nullable(),
        imageName: Yup.string().required(),
        base64PhotoImage: Yup.string().required(),
        base64Prefix: Yup.string().nullable(),
      })
      .required('Company logo is required'),
    companyName: Yup.string().required('Company Name is required'),
    companyEmail: Yup.string()
      .email('Invalid email format')
      .required('Company Support Email is required'),
    companyWebsite: Yup.string().url().nullable(),
    industryTypeId: Yup.number().required('Industry is required'),
    registrationNumber: Yup.string().nullable(),
    address1: Yup.string().required('Address is required'),
    countryId: Yup.string().required('Country is required'),
    stateId: Yup.string().required('State is required'),
    lgaId: Yup.string().required('LGA is required'),
    ...(validateUser
      ? { clientAdminId: Yup.number().required('User is Required') }
      : { clientAdminId: Yup.number().nullable() }),
  });

const contactInfoSchema = Yup.object().shape({
  contactFirstName: Yup.string().required('First Name is required'),
  contactLastName: Yup.string().required('Last Name is required'),
  contactEmail: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  contactPhoneNumber: Yup.string().required('Phone Number is required'),
});

const companySubscriptionSchema = (
  minStartDate?: string,
  minEndDate?: string
) =>
  Yup.object().shape({
    subscriptionPlanId: Yup.string().nullable(),
    startDate: createDateSchema(false, false, minStartDate).nullable(),
    endDate: createDateSchema(false, false, minEndDate).nullable(),
  });

const authenticationMethodSchema = (validateUrl: boolean) =>
  Yup.object().shape({
    companyAuthProtocolId: Yup.number().required('Method is required'),
    ...(validateUrl
      ? {
          activeDirectoryUrl: Yup.string()
            .url()
            .required('Active Directory URL is required'),
        }
      : {
          activeDirectoryUrl: Yup.string().nullable(),
        }),
  });

export {
  companyInfoSchema,
  contactInfoSchema,
  companySubscriptionSchema,
  authenticationMethodSchema,
};
