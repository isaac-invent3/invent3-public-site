import { HStack, VStack } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useField } from 'formik';
import moment from 'moment';
import { updateRecurrence } from '~/lib/redux/slices/DateSlice';
import {
  ConditionalDateSelector,
  ErrorMessage,
  FormSectionInfo,
} from '@repo/ui/components';
import { formattedDateTime } from '~/lib/utils/helperFunctions';

interface EndDateTimeProps {
  minEndDate?: Date;
  maxEndDate?: Date;
}
const EndDateTime = (props: EndDateTimeProps) => {
  const { minEndDate, maxEndDate } = props;
  const dispatch = useAppDispatch();
  const recurrence = useAppSelector((state) => state.date.info.recurrence);
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('endDate');
  return (
    <HStack width="full" spacing="29px" alignItems="flex-start">
      <FormSectionInfo
        title="Ends"
        info="Define when the repeat schedule should stop"
        isRequired={false}
        maxWidth="130px"
      />
      <VStack width="full" alignItems="flex-start" spacing="8px">
        <ConditionalDateSelector
          minDate={minEndDate}
          maxDate={maxEndDate}
          selectedTime={recurrence.endTime}
          dateDisplay={
            recurrence.frequency?.label &&
            recurrence.frequency?.label.toLowerCase() === 'monthly'
              ? 'MMMM'
              : null
          }
          selectedDate={
            recurrence.endDate ? moment(recurrence.endDate).toDate() : undefined
          }
          includeTime
          handleSelectedDateTime={(date, time) => {
            if (date) {
              helpers.setValue(
                date
                  ? formattedDateTime(date, time ?? null).format(
                      `DD/MM/YYYY${time ? ' HH:mm' : ''}`
                    )
                  : null
              );
            }
            dispatch(
              updateRecurrence({
                endDate: date ? moment(date).toISOString() : null,
                endTime: time ?? null,
              })
            );
          }}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </HStack>
  );
};

export default EndDateTime;
