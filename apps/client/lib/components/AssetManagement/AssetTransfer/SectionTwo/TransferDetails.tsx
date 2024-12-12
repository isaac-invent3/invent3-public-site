import { VStack } from '@chakra-ui/react';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import { Field } from 'formik';
import { FormDatePicker, FormTextAreaInput } from '@repo/ui/components';

const TransferDetails = () => {
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader variant="secondary">Transfer Details</DetailHeader>
      <VStack width="full" spacing="16px">
        <FormDatePicker
          name="transferDate"
          label="Transfer Date"
          minDate={new Date()}
        />
        <Field
          as={FormTextAreaInput}
          name="comments"
          type="text"
          label="Reason for Transfer"
          customStyle={{ height: '131px' }}
        />
      </VStack>
      {/* <User /> */}
    </VStack>
  );
};

export default TransferDetails;
