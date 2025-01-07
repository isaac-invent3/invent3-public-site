import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';

import EmployeeSelect from '../../../../Common/EmployeeSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { FormSectionInfo } from '@repo/ui/components';

const AssetOwner = () => {
  const dispatch = useAppDispatch();
  const { currentOwnerName, assignedToName, responsibleForName } =
    useAppSelector((state) => state.asset.assetForm);

  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <FormSectionInfo
          title="Owner's Info"
          info="Enter details of the person responsible for the asset."
          isRequired
        />
      </Flex>
      <SimpleGrid columns={4} gap="11px" width="full">
        <EmployeeSelect
          selectName="currentOwner"
          selectTitle="Owner"
          defaultName={currentOwnerName}
          handleSelect={(option) =>
            dispatch(updateAssetForm({ currentOwnerName: option.label }))
          }
        />
        <EmployeeSelect
          selectName="assignedTo"
          selectTitle="Assigned to"
          defaultName={assignedToName}
          handleSelect={(option) =>
            dispatch(updateAssetForm({ assignedToName: option.label }))
          }
        />
        <EmployeeSelect
          selectName="responsibleFor"
          selectTitle="Responsible for"
          defaultName={responsibleForName}
          handleSelect={(option) =>
            dispatch(updateAssetForm({ responsibleForName: option.label }))
          }
        />
      </SimpleGrid>
    </HStack>
  );
};

export default AssetOwner;
