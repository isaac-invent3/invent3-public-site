import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../../SectionInfo';
import EmployeeSelect from './EmployeeSelect';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/assetSlice';

const AssetOwner = () => {
  const dispatch = useAppDispatch();

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
        <EmployeeSelect
          selectName="currentOwner"
          selectTitle="Owner"
          handleSelect={(option) =>
            dispatch(updateAssetForm({ currentOwnerName: option.label }))
          }
        />
        <EmployeeSelect
          selectName="assignedTo"
          selectTitle="Assigned to"
          handleSelect={(option) =>
            dispatch(updateAssetForm({ assignedToName: option.label }))
          }
        />
        <EmployeeSelect
          selectName="responsibleFor"
          selectTitle="Responsible for"
          handleSelect={(option) =>
            dispatch(updateAssetForm({ responsibleForName: option.label }))
          }
        />
      </SimpleGrid>
    </HStack>
  );
};

export default AssetOwner;
