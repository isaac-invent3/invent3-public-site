import { VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { Field } from 'formik';
import { FormDatePicker, FormTextAreaInput } from '@repo/ui/components';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import {
  useGetAllAssetDisposalReasonsQuery,
  useSearchAssetDisposalMutation,
} from '~/lib/redux/services/asset/disposal.services';

const DisposalDetails = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAssetDisposalReasonsQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  const [searchDisposalReason] = useSearchAssetDisposalMutation({});
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader variant="secondary" customStyles={{ fontWeight: 700 }}>
        Disposal Details
      </DetailHeader>
      <VStack width="full" spacing="16px">
        <FormDatePicker
          name="disposalDate"
          label="Disposal Date"
          minDate={new Date()}
        />
        <GenericAsyncSelect
          selectName="disposalReasonId"
          selectTitle="Reason"
          data={data}
          labelKey="reason"
          valueKey="disposalReasonId"
          mutationFn={searchDisposalReason}
          isLoading={isLoading}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
        <Field
          as={FormTextAreaInput}
          name="comment"
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
