import { Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch } from '~/lib/redux/hooks';
import {
  useGetAllMaintenanceFrequenciesQuery,
  useSearchMaintenanceFrequenciesMutation,
} from '~/lib/redux/services/maintenance/frequency.services';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';

const Frequency = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllMaintenanceFrequenciesQuery({
    pageSize: 25,
    pageNumber,
  });
  const [searchMaintenanceFrequency] = useSearchMaintenanceFrequenciesMutation(
    {}
  );
  const dispatch = useAppDispatch();
  return (
    <HStack width="full" alignItems="flex-start" spacing="81px">
      <Flex width="full" maxW="130px">
        <SectionInfo
          title="Frequency"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <GenericAsyncSelect
        selectName="frequencyId"
        selectTitle="Schedule Frequency"
        data={data}
        labelKey="frequencyName"
        valueKey="frequencyId"
        mutationFn={searchMaintenanceFrequency}
        isLoading={isLoading}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        handleSelect={(option) =>
          dispatch(updateScheduleForm({ frequencyName: option.label }))
        }
      />
    </HStack>
  );
};

export default Frequency;
