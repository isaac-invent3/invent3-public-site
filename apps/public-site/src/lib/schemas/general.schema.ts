import * as Yup from 'yup';

const contactSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
  company: Yup.string().required('Company is Required'),
  designation: Yup.string().nullable(),
  email: Yup.string().email('Invalid Email Adress').required('Email Required'),
  phoneNumber: Yup.string().required('Phone number is Required'),
  message: Yup.string().required('Message is Required'),
});

const freeEmailProviders = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'protonmail.com',
  'zoho.com',
];

const waitlistSchema = Yup.object().shape({
  companyName: Yup.string()
    .matches(/^[A-Za-z0-9&.,'’\-\s]{2,100}$/, 'Invalid Company Name')
    .required('Company Name is Required'),

  industry: Yup.string()
    .matches(/^[A-Za-z\s]{2,50}$/, 'Invalid Industry')
    .required('Industry is Required'),

  companyWebsite: Yup.string()
    .url('Must be a valid URL')
    .matches(
      /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,}(\S*)?$/i,
      'Enter a valid company website'
    )
    .required('Company Website is Required'),

  emailAddress: Yup.string()
    .email('Invalid Email Address')
    .test(
      'business-email',
      'Please use your business email address',
      function (value) {
        const { createError } = this;

        if (!value) {
          return createError({ message: 'Email is required' });
        }

        const domain = value.split('@')[1]?.toLowerCase();

        if (!domain) {
          return createError({ message: 'Invalid Email Address' });
        }

        if (freeEmailProviders.includes(domain)) {
          return createError({
            message: 'Please use your business email address',
          });
        }

        return true;
      }
    )
    .required('Email is Required'),

  fullName: Yup.string()
    .matches(/^[A-Za-z ,.'-]{2,60}$/, 'Invalid Name')
    .required('Name is Required'),
});

export { contactSchema, waitlistSchema };
