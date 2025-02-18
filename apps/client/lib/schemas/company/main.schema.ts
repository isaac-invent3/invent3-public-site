import * as Yup from 'yup';
import { createDateSchema } from '../general.schema';

const companyInfoSchema = Yup.object().shape({
  companyLogo: Yup.object()
    .shape({
      imageId: Yup.number().nullable(),
      imageName: Yup.string().required(),
      base64PhotoImage: Yup.string().required(),
      base64Prefix: Yup.string().nullable(),
    })
    .required('Company logo is required'),
  companyName: Yup.string().required('Company Name is required'),
  registrationNumber: Yup.string().required(
    'Company Registration Number is Required'
  ),
});


const contactInfoSchema = Yup.object().shape({
  contactFirstName: Yup.string().required('First Name is required'),
  contactLastName: Yup.string().required('Last Name is required'),
  contactEmail: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  contactPhoneNumber: Yup.string().required('Phone Number is required'),
  contactJobTitle: Yup.string().required('Job Title is required'),
});

const companyContactInformationSchema = Yup.object().shape({
  contactInformation: Yup.array()
    .of(contactInfoSchema)
    .test(
      'at-least-one-completed',
      'At least one contact record must be fully completed',
      (contactList) => {
        return contactList?.some(
          (contact) =>
            contact.contactFirstName &&
            contact.contactLastName &&
            contact.contactEmail &&
            contact.contactPhoneNumber &&
            contact.contactJobTitle
        );
      }
    ),
});

const companySubscriptionSchema = (minStartDate?: string, minEndDate?: string) =>
  Yup.object().shape({
    subscriptionPlan: Yup.string().required('Subscription Plan is Required'),
    startDate: createDateSchema(false, true, minStartDate).required(
      'Start Date is Required'
    ),
    endDate: createDateSchema(false, false, minEndDate).nullable(),

  });

export {
  companyInfoSchema,
  companyContactInformationSchema,
  companySubscriptionSchema,
};
