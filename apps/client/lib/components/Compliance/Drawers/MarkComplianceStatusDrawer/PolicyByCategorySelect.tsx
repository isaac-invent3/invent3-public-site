import { FormInputWrapper } from '@repo/ui/components';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useGetAssetCategoryPoliciesQuery } from '~/lib/redux/services/asset/compliance.services';

const PolicyByCategorySelect = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetAssetCategoryPoliciesQuery({
    assetCategoryId: id,
  });
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="24px"
      description="Specify the compliance policy"
      title="Compliance Policy"
      isRequired
    >
      <GenericAsyncSelect
        selectName="compliancePolicyId"
        selectTitle="Compliance Policy"
        data={data}
        labelKey="policyName"
        valueKey="policyId"
        isLoading={isLoading}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </FormInputWrapper>
  );
};

export default PolicyByCategorySelect;
