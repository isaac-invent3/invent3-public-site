import { Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch } from '~/lib/redux/hooks';
import {
  useGetAllMaintenanceTypeQuery,
  useSearchMaintenanceTypeMutation,
} from '~/lib/redux/services/maintenance/type.services';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';

const Type = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllMaintenanceTypeQuery({
    pageSize: 25,
    pageNumber,
  });
  const [searchMaintenanceType] = useSearchMaintenanceTypeMutation({});
  const dispatch = useAppDispatch();
  return (
    <HStack width="full" alignItems="flex-start" spacing="56px">
      <Flex width="full" maxW="130px">
        <SectionInfo
          title="Type"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <GenericAsyncSelect
        selectName="typeId"
        selectTitle="Schedule Type"
        data={data}
        labelKey="typeName"
        valueKey="maintenanceTypeId"
        mutationFn={searchMaintenanceType}
        isLoading={isLoading}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        handleSelect={(option) =>
          dispatch(updateScheduleForm({ typeName: option.label }))
        }
      />
    </HStack>
  );
};

export default Type;
