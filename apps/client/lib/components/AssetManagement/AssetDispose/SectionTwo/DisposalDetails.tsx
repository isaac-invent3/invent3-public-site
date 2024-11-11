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
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
// import User from '../User';

const DisposalDetails = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAssetConditionQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  const [searchCondition] = useSearchConditionMutation({});
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader variant="secondary">Disposal Details</DetailHeader>
      <VStack width="full" spacing="16px">
        <CustomDatePicker name="disposalDate" label="Disposal Date" />
        <GenericAsyncSelect
          selectName="reason"
          selectTitle="Reason"
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
          name="additionalInformation"
          type="text"
          label="Additional Information"
          customStyle={{ height: '177px' }}
        />
      </VStack>
      {/* <User /> */}
    </VStack>
  );
};

export default DisposalDetails;
