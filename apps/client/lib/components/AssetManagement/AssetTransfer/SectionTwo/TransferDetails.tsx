import { VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import CustomDatePicker from '../../../UI/Form/FormDatePicker';
import { Field } from 'formik';
import TextareaInput from '~/lib/components/UI/TextArea';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import {
  useGetAllAssetConditionQuery,
  useSearchConditionMutation,
} from '~/lib/redux/services/asset/condition.services';
// import User from '../User';

const TransferDetails = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAssetConditionQuery({
    pageSize: 25,
    pageNumber,
  });
  const [searchCondition] = useSearchConditionMutation({});
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader variant="secondary">Transfer Details</DetailHeader>
      <VStack width="full" spacing="16px">
        <CustomDatePicker name="transferDate" label="Transfer Date" />
        <GenericAsyncSelect
          selectName="conditionId"
          selectTitle="Condition"
          data={data}
          labelKey="conditionName"
          valueKey="conditionId"
          mutationFn={searchCondition}
          isLoading={isLoading}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
        <Field
          as={TextareaInput}
          name="reason"
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
