import { Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import {
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
} from '~/lib/redux/services/maintenance/plan.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { FormInputWrapper, FormSectionInfo } from '@repo/ui/components';

const Plan = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllMaintenancePlanQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  const [searchMaintenancePlan] = useSearchMaintenancePlanMutation({});

  return (
    <FormInputWrapper
      title="Plan Type"
      description="Select the category for this maintenance plan"
      isRequired
      sectionMaxWidth="118px"
      customSpacing="73px"
    >
      <GenericAsyncSelect
        selectName="planTypeId"
        selectTitle="Maintenance Plan"
        data={data}
        labelKey="planName"
        valueKey="maintenancePlanId"
        mutationFn={searchMaintenancePlan}
        isLoading={isLoading}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </FormInputWrapper>
  );
};

export default Plan;
