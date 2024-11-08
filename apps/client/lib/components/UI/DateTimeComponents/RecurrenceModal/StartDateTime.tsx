import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../../Form/FormSectionInfo';
import CustomSelectDateButton from '../Common/CustomSelectDateButton';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import ErrorMessage from '../../ErrorMessage';
import { updateRecurrence } from '~/lib/redux/slices/DateSlice';
import { useField } from 'formik';
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
    <HStack width="full" spacing="29px" alignItems="flex-start" mb="32px">
      <SectionInfo
        title="Starts"
        info="Add name that users can likely search with"
        isRequired={false}
        maxWidth="130px"
      />
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
    </HStack>
  );
};

export default StartDateTime;
