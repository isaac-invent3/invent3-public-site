import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';

import UserSelect from '../../../../Common/SelectComponents/UserSelect';
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
      direction={{ base: 'column', md: 'row' }}
      formSectionCustomStyle={{
        maxW: { md: '118px' },
      }}
    >
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(4, minmax(0, 1fr))',
        }}
        gap="11px"
        width="full"
      >
        <GridItem colSpan={1}>
          <UserSelect
            selectName="currentOwner"
            selectTitle="Owner"
            defaultName={currentOwnerName}
            handleSelect={(option) =>
              dispatch(updateAssetForm({ currentOwnerName: option.label }))
            }
          />
        </GridItem>
        <GridItem colSpan={1}>
          <UserSelect
            selectName="assignedTo"
            selectTitle="Assigned to"
            defaultName={assignedToName}
            handleSelect={(option) =>
              dispatch(updateAssetForm({ assignedToName: option.label }))
            }
          />
        </GridItem>
        <GridItem colSpan={1}>
          <UserSelect
            selectName="responsibleFor"
            selectTitle="Responsible for"
            defaultName={responsibleForName}
            handleSelect={(option) =>
              dispatch(updateAssetForm({ responsibleForName: option.label }))
            }
          />
        </GridItem>
      </Grid>
    </FormInputWrapper>
  );
};

export default AssetOwner;
