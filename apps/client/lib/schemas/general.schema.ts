import * as Yup from 'yup';

//Accepted date format is DD/MM/YYYY
// If time is included, it is DD/MM/YYYY HH:mm
const createDateSchema = (
  includeTime: boolean,
  isRequired: boolean,
  minDate?: string, //Format (DD/MM/YYYY)
  maxDate?: string //Format (DD/MM/YYYY)
) => {
  const timePart = includeTime ? ' \\d{2}:\\d{2}' : ''; // Optional time part
  const dateFormat = `^\\d{2}\\/\\d{2}\\/\\d{4}${timePart}$`; // Regex for date format

  return Yup.string()
    .matches(
      new RegExp(dateFormat),
      `Date${includeTime ? ' and Time' : ''} is Required`
    ) // Validate the format
    .test('is-valid-date', 'Invalid Date', function (value) {
      const { createError } = this;

      // Handle empty value
      if (!isRequired && !value) return true; // If not required and value is empty, it's valid

      if (!value) return createError({ message: 'Date is required' }); // If required, but value is empty

      const parts = value.split(' ');
      const datePart = parts[0]; // Date part will always be present
      const timePartValue = includeTime && parts[1] ? parts[1] : undefined; // Time part is only present if includeTime is true

      if (!datePart) return createError({ message: 'Date part is missing' });

      const [dayStr, monthStr, yearStr] = datePart.split('/');

      // Convert strings to numbers
      const day = Number(dayStr);
      const month = Number(monthStr);
      const year = Number(yearStr);

      // Check if year, month, and day are valid
      const isValidYear = !isNaN(year) && year > 1900;
      const isValidMonth = !isNaN(month) && month >= 1 && month <= 12;
      const isValidDay = !isNaN(day) && day >= 1 && day <= 31;

      // Handle month-day relationship
      const daysInMonth = new Date(year, month, 0).getDate(); // Get number of days in the month
      const isValidDate =
        isValidYear && isValidMonth && isValidDay && day <= daysInMonth;

      if (!isValidDate) return false;

      let hour = 0;
      let minute = 0;

      if (includeTime && timePartValue) {
        const [hourStr, minuteStr] = timePartValue.split(':'); // Split time into hour and minute
        hour = Number(hourStr);
        minute = Number(minuteStr);

        // Check time validation
        const isValidHour = !isNaN(hour) && hour >= 0 && hour <= 23;
        const isValidMinute = !isNaN(minute) && minute >= 0 && minute <= 59;

        if (!isValidHour || !isValidMinute) {
          return createError({ message: 'Invalid time' }); // Custom error message for time validation
        }
      }

      // Check against minimum date if provided
      if (minDate) {
        const minDateParts = minDate.split(' ');
        const minDatePart = minDateParts[0];
        const minTimePart =
          includeTime && minDateParts[1] ? minDateParts[1] : '00:00';

        if (!minDatePart)
          return createError({ message: 'Min Date part is missing' });
        const [minDay, minMonth, minYear] = minDatePart.split('/');
        const [minHour, minMinute] = minTimePart.split(':');

        const minDateObj = new Date(
          Number(minYear),
          Number(minMonth) - 1,
          Number(minDay),
          Number(minHour),
          Number(minMinute)
        );

        const inputDateObj = new Date(year, month - 1, day, hour, minute);

        // Ensure that the input date is greater than the minimum date
        if (inputDateObj < minDateObj) {
          return createError({
            message: `Date must be greater than ${minDate}`,
          }); // Custom error message
        }
      }

      // Check against maximum date if provided
      if (maxDate) {
        const maxDateParts = maxDate.split(' ');
        const maxDatePart = maxDateParts[0];
        const maxTimePart =
          includeTime && maxDateParts[1] ? maxDateParts[1] : '23:59';

        if (!maxDatePart)
          return createError({ message: 'Max Date part is missing' });
        const [maxDay, maxMonth, maxYear] = maxDatePart.split('/');
        const [maxHour, maxMinute] = maxTimePart.split(':');

        const maxDateObj = new Date(
          Number(maxYear),
          Number(maxMonth) - 1,
          Number(maxDay),
          Number(maxHour),
          Number(maxMinute)
        );

        const inputDateObj = new Date(year, month - 1, day, hour, minute);

        // Ensure that the input date does not exceed the maximum date
        if (inputDateObj > maxDateObj) {
          return createError({
            message: `Date must be before ${maxDate}`,
          }); // Custom error message
        }
      }

      return true; // Return true if all checks pass
    });
};

const assigneeSchema = Yup.object().shape({
  assignee: Yup.string().required('User is Required'),
});

const recurrenceSchema = (minStartDate?: string, minEndDate?: string) =>
  Yup.object().shape({
    startDate: createDateSchema(true, true, minStartDate).required(
      'Start Date is Required'
    ),
    endDate: createDateSchema(true, false, minEndDate).nullable(),
  });

const templateSchema = Yup.object().shape({
  templateName: Yup.string().required('Name is Required'),
  templateDescription: Yup.string().required('Description is Required'),
});

const documentSchema = Yup.object().shape({
  documents: Yup.array().of(
    Yup.object().shape({
      documentId: Yup.number().nullable(),
      documentName: Yup.string().required(),
      base64Document: Yup.string().required(),
      base64Prefix: Yup.string().nullable(),
    })
  ),
});

export {
  createDateSchema,
  assigneeSchema,
  recurrenceSchema,
  templateSchema,
  documentSchema,
};
