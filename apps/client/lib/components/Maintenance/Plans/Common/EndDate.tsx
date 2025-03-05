import { VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import moment from 'moment';

import {
  ConditionalDateSelector,
  ErrorMessage,
  FormInputWrapper,
} from '@repo/ui/components';
import { dateFormatter } from '~/lib/utils/Formatters';

interface EndDateProps {
  sectionMaxWidth: string;
  spacing: string;
  minDate?: Date;
}
const EndDate = (props: EndDateProps) => {
  const { sectionMaxWidth, spacing, minDate } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('endDate');
  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      customSpacing={spacing}
      title="End Date"
      description="Specify when the maintenance plan will end"
      isRequired
    >
      <VStack width="full" spacing="4px" alignItems="flex-start">
        <ConditionalDateSelector
          selectedDate={
            meta.value ? moment(meta.value, 'DD/MM/YYYY').toDate() : undefined
          }
          includeTime={false}
          handleSelectedDateTime={(date) => {
            helpers.setValue(date ? dateFormatter(date, 'DD/MM/YYYY') : date);
          }}
          minDate={minDate}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default EndDate;
