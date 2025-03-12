import { VStack } from '@chakra-ui/react';

import {
  CustomSelectDateButton,
  ErrorMessage,
  FormInputWrapper,
} from '@repo/ui/components';
import { useField } from 'formik';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateRecurrence } from '~/lib/redux/slices/DateSlice';
import { formattedDateTime } from '~/lib/utils/helperFunctions';

interface StartDateTimeProps {
  minStartDate?: Date;
  maxStartDate?: Date;
}
const StartDateTime = (props: StartDateTimeProps) => {
  const { minStartDate, maxStartDate } = props;
  const dispatch = useAppDispatch();
  const recurrence = useAppSelector((state) => state.date.info.recurrence);
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('startDate');
  return (
    <FormInputWrapper
      title="Starts"
      description="Specify the start date and time for the repeats"
      isRequired={false}
      sectionMaxWidth="130px"
      customSpacing="29px"
      mb="32px"
    >
      <VStack width="full" alignItems="flex-start" spacing="8px">
        <CustomSelectDateButton
          minDate={minStartDate}
          maxDate={maxStartDate}
          includeTimeDisplay
          dateDisplay={
            recurrence.frequency?.label &&
            recurrence.frequency?.label.toLowerCase() === 'monthly'
              ? 'MMMM'
              : null
          }
          selectedTime={recurrence.startTime}
          selectedDate={
            recurrence.startDate
              ? moment(recurrence.startDate).toDate()
              : undefined
          }
          handleSelectedDateTime={(date, time) => {
            if (date) {
              helpers.setValue(
                formattedDateTime(date, time ?? null).format(
                  `DD/MM/YYYY${time ? ' HH:mm' : ''}`
                )
              );
            }
            dispatch(
              updateRecurrence({
                startDate: date ? moment(date).toISOString() : null,
                startTime: time ?? null,
              })
            );
          }}
          customStyle={{ width: '179px', height: '50px' }}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default StartDateTime;
