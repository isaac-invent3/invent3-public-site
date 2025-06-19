import { FormInputWrapper } from '@repo/ui/components';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useGetComplianceStatusTypeQuery } from '~/lib/redux/services/asset/compliance.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const PolicyByCategorySelect = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetComplianceStatusTypeQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
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
        selectName="policyId"
        selectTitle="Compliance Policy"
        data={data}
        labelKey="standard"
        valueKey="regulationId"
        isLoading={isLoading}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </FormInputWrapper>
  );
};

export default PolicyByCategorySelect;
