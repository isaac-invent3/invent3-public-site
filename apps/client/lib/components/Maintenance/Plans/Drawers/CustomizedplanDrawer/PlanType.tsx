import { Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import {
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
} from '~/lib/redux/services/maintenance/plan.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { FormSectionInfo } from '@repo/ui/components';

const Plan = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllMaintenancePlanQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  const [searchMaintenancePlan] = useSearchMaintenancePlanMutation({});

  return (
    <HStack width="full" alignItems="flex-start" spacing="73px">
      <Flex width="full" maxW="118px">
        <FormSectionInfo
          title="Plan Type"
          info="Select the category for this maintenance plan"
          isRequired
        />
      </Flex>
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
    </HStack>
  );
};

export default Plan;
