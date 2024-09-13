import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import SelectInput from '~/lib/components/UI/Select';
import { useGetAllUsersQuery } from '~/lib/redux/services/user.services';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { useGetAllDepartmentsQuery } from '~/lib/redux/services/asset/location.services';

const AssetOwner = () => {
  const { data: userData, isLoading: userLoading } = useGetAllUsersQuery({
    pageSize: 25,
  });
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllDepartmentsQuery({ pageSize: 25 });
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Owner's Info"
          info="Choose the category and the sub-category"
          isRequired
        />
      </Flex>
      <SimpleGrid columns={4} gap="11px" width="full">
        <SelectInput
          name="currentOwner"
          title="Owner"
          options={generateOptions(
            userData?.data?.items,
            ['firstName', 'lastName'],
            'userId'
          )}
          isLoading={userLoading}
          isSearchable
        />
        <SelectInput
          name="department"
          title="Department"
          options={generateOptions(
            departmentData?.data?.items,
            'departmentName',
            'departmentId'
          )}
          isLoading={departmentLoading}
          isSearchable
        />
        <SelectInput
          name="assignedTo"
          title="Assigned to"
          options={generateOptions(
            userData?.data?.items,
            ['firstName', 'lastName'],
            'userId'
          )}
          isLoading={userLoading}
          isSearchable
        />
        <SelectInput
          name="responsibleFor"
          title="Responsible for"
          options={generateOptions(
            userData?.data?.items,
            ['firstName', 'lastName'],
            'userId'
          )}
          isLoading={userLoading}
          isSearchable
        />
      </SimpleGrid>
    </HStack>
  );
};

export default AssetOwner;
