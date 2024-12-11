import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';

import SectionInfo from '../../../../UI/Form/FormSectionInfo';
import EmployeeSelect from '../../../../Common/EmployeeSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';

const AssetOwner = () => {
  const dispatch = useAppDispatch();
  const { currentOwnerName, assignedToName, responsibleForName } =
    useAppSelector((state) => state.asset.assetForm);

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
