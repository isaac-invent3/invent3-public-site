import { Flex, HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import AddButton from '~/lib/components/UI/Form/FormAddButton';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import {
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
} from '~/lib/redux/services/maintenance/plan.services';

const Plan = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllMaintenancePlanQuery({
    pageSize: 25,
    pageNumber,
  });
  const [searchMaintenancePlan] = useSearchMaintenancePlanMutation({});
  return (
    <HStack width="full" alignItems="flex-start" spacing="81px">
      <Flex width="full" maxW="130px">
        <SectionInfo
          title="Maintenance Plan"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <VStack width="full" alignItems="flex-end" spacing="2px">
        <GenericAsyncSelect
          selectName="planId"
          selectTitle="Maintenance Plan"
          data={data}
          labelKey="planName"
          valueKey="maintenancePlanId"
          mutationFn={searchMaintenancePlan}
          isLoading={isLoading}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
        <AddButton handleClick={() => {}}>Add New Plan</AddButton>
      </VStack>
    </HStack>
  );
};

export default Plan;
