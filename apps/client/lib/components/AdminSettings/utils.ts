const exportFormatOptions = [
  { label: 'CSV', value: 1 },
  { label: 'PDF', value: 2 },
];

const sessionTimeoutDurationOptions = [
  { label: '15 Minutes', value: 1 },
  { label: '30 Minutes', value: 2 },
  { label: '60 Minutes', value: 3 },
];

const maxFailedLoginAttemptsOptions = [
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

const passwordExpiryPeriodOptions = [
  { label: '7 Days', value: 1 },
  { label: '30 Days', value: 2 },
];

const passwordLengthOptions = [
  { label: '8', value: 8 },
  { label: '12', value: 12 },
  { label: '16', value: 16 },
];
const exportFrequencyOptions = [
  { label: '7 Days', value: 1 },
  { label: '30 Days', value: 2 },
];

const languageOptions = [{ label: 'English', value: 1 }];

const dateFormatOptions = [
  { label: 'MM/DD/YYYY', value: 1 },
  { label: 'DD/MM/YYYY', value: 2 },
  { label: 'YYYY-MM-DD', value: 3 },
];

export {
  exportFormatOptions,
  sessionTimeoutDurationOptions,
  maxFailedLoginAttemptsOptions,
  languageOptions,
  dateFormatOptions,
  passwordExpiryPeriodOptions,
  passwordLengthOptions,
  exportFrequencyOptions,
};
