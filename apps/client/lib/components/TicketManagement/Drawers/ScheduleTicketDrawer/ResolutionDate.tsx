import { Flex, HStack, VStack } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import DateTimeButtons from '~/lib/components/UI/DateTimeComponents/DateTimeButtons';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

const ResolutionDate = () => {
  const { setFieldValue, submitCount, values } = useFormikContext<any>();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('resolutionDate');
  return (
    <HStack width="full" alignItems="flex-start" spacing="24px">
      <Flex width="full" maxW="141px">
        <SectionInfo
          title="Resolution Date"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>

      <VStack width="full" spacing="12px" alignItems="flex-start">
        <DateTimeButtons
          buttonVariant={'secondary'}
          includeTime={true}
          minDate={new Date()}
          selectedDate={values.resolutionDate?.split(' ')?.[0] ?? undefined}
          handleDateTimeSelect={(dateTime) => {
            helpers.setValue(dateTime ?? null);
            setFieldValue('resolutionDate', dateTime ?? null);
          }}
        />

        {submitCount > 0 && meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </HStack>
  );
};

export default ResolutionDate;
