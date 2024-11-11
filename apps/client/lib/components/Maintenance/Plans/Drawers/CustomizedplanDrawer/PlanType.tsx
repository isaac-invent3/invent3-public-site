import { Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import {
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
} from '~/lib/redux/services/maintenance/plan.services';

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
        <SectionInfo
          title="Plan Type"
          info="Add name that users can likely search with"
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
