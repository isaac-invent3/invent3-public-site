const exportFormatOptions = [
  { label: 'CSV', value: 1 },
  { label: 'PDF', value: 2 },
];

const sessionTimeoutDurationOptions = [
  { label: '15 Minutes', value: 0 },
  { label: '30 Minutes', value: 1 },
  { label: '60 Minutes', value: 2 },
];

const maxFailedLoginAttemptsOptions = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
];

const passwordExpiryPeriodOptions = [
  { label: '7 Days', value: 0 },
  { label: '30 Days', value: 1 },
];

const passwordLengthOptions = [
  { label: '8', value: 8 },
  { label: '12', value: 12 },
  { label: '16', value: 16 },
];
const exportFrequencyOptions = [
  { label: '7 Days', value: 0 },
  { label: '30 Days', value: 1 },
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
