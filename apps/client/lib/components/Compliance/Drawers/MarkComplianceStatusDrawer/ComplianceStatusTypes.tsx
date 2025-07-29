import { FormInputWrapper } from '@repo/ui/components';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useGetComplianceStatusTypeQuery } from '~/lib/redux/services/asset/compliance.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const ComplianceStatusType = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetComplianceStatusTypeQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="24px"
      description="Specify the compliance status"
      title="Compliance Status"
      isRequired
    >
      <GenericAsyncSelect
        selectName="assetComplianceStatusId"
        selectTitle="Compliance Status"
        data={data}
        labelKey="statusName"
        valueKey="statusTypeId"
        isLoading={isLoading || isFetching}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </FormInputWrapper>
  );
};

export default ComplianceStatusType;
