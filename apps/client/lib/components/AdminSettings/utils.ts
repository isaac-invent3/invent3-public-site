const exportFormatOptions = [
  { label: 'CSV', value: 1 },
  { label: 'PDF', value: 2 },
];

const sessionTimeoutDurationOptions = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
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
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
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
