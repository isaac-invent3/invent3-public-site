import { SimpleGrid } from '@chakra-ui/react';

import EmployeeSelect from '../../../../Common/SelectComponents/EmployeeSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { FormInputWrapper } from '@repo/ui/components';

const AssetOwner = () => {
  const dispatch = useAppDispatch();
  const { currentOwnerName, assignedToName, responsibleForName } =
    useAppSelector((state) => state.asset.assetForm);

  return (
    <FormInputWrapper
      sectionMaxWidth="118px"
      customSpacing="104px"
      description="Enter details of the person responsible for the asset."
      title="Owner's Info"
      isRequired
    >
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="11px" width="full">
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
    </FormInputWrapper>
  );
};

export default AssetOwner;
