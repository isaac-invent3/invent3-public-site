import { FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useGetAllComplianceByTypeQuery } from '~/lib/redux/services/asset/compliance.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const Compliance = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [field, meta, helpers] = useField('regulationId');
  const { data, isLoading, isFetching } = useGetAllComplianceByTypeQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
      complianceTypeId: meta.value!,
    },
    { skip: !meta.value }
  );
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="24px"
      description="Specify the expected lifespan of the asset"
      title="Compliance"
      isRequired
    >
      <GenericAsyncSelect
        selectName="complianceRegulationId"
        selectTitle="Compliance"
        data={data}
        labelKey="standard"
        valueKey="regulationId"
        isLoading={isLoading || isFetching}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </FormInputWrapper>
  );
};

export default Compliance;
