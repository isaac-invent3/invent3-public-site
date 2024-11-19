import { VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import CustomDatePicker from '../../../UI/Form/FormDatePicker';
import { Field } from 'formik';
import TextareaInput from '~/lib/components/UI/TextArea';
// import User from '../User';

const TransferDetails = () => {
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader variant="secondary">Transfer Details</DetailHeader>
      <VStack width="full" spacing="16px">
        <CustomDatePicker
          name="transferDate"
          label="Transfer Date"
          minDate={new Date()}
        />
        <Field
          as={TextareaInput}
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
