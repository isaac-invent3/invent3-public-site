import { APPEARANCE, DATE_FORMAT, LANGUAGE } from '../utils';

const appreanceOptions = [
  {
    label: 'Light',
    value: APPEARANCE.APPEARANCE_LIGHT,
  },
  {
    label: 'Dark',
    value: APPEARANCE.APPEARANCE_DARK,
  },
];

const languageOptions = [
  {
    label: 'English',
    value: LANGUAGE.LANGUAGE_ENGLISH,
  },
];

const dateFormatOptions = [
  {
    label: 'DD/MM/YYYY',
    value: DATE_FORMAT.DATE_FORMAT_DDMMYYYY,
  },
  {
    label: 'MM/DD/YYYY',
    value: DATE_FORMAT.DATE_FORMAT_MMDDYYYY,
  },
  {
    label: 'YYYY/MM/DD',
    value: DATE_FORMAT.DATE_FORMAT_YYYYMMDD,
  },
];

export { appreanceOptions, languageOptions, dateFormatOptions };
