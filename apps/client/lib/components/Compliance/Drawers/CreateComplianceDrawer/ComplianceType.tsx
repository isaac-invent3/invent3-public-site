import { FormInputWrapper } from '@repo/ui/components';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useGetAllComplianceTypesQuery } from '~/lib/redux/services/asset/compliance.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const ComplianceType = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllComplianceTypesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="24px"
      description="Select Compliance Type"
      title="Compliance Type"
      isRequired
    >
      <GenericAsyncSelect
        selectName="regulationId"
        selectTitle="Compliance Type"
        data={data}
        labelKey="typeName"
        valueKey="complianceTypeId"
        isLoading={isLoading || isFetching}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </FormInputWrapper>
  );
};

export default ComplianceType;
