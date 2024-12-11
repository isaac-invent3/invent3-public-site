import { Flex, HStack, VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import moment from 'moment';

import ConditionalDateSelector from '~/lib/components/UI/DateTimeComponents/Common/ConditionalDateSelector';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
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
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="End Date"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>

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
    </HStack>
  );
};

export default EndDate;
