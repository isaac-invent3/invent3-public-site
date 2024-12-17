import { Text, VStack } from '@chakra-ui/react';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import { Field } from 'formik';
import { FormDatePicker, FormTextAreaInput } from '@repo/ui/components';

const TransferDetails = () => {
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader variant="secondary" customStyles={{ fontWeight: 700 }}>
        Transfer Details
      </DetailHeader>
      <VStack width="full" spacing="40px">
        <VStack width="full" spacing="16px" alignItems="flex-start">
          <Text color="neutral.600" size="md">
            Date:
          </Text>
          <FormDatePicker
            name="transferDate"
            label="Transfer Date"
            minDate={new Date()}
            // showPredefinedDate
          />
        </VStack>
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
