/* eslint-disable no-unused-vars */
import { Grid, GridItem, Text, useDisclosure, VStack } from '@chakra-ui/react';
import LocationModal from './Modals/LocationModal';
import { AssetFormDetails } from '~/lib/interfaces/asset/general.interface';
import {
  ErrorMessage,
  FormAddButton,
  FormInputWrapper,
} from '@repo/ui/components';
import { useField } from 'formik';
import { useAppSelector } from '~/lib/redux/hooks';
import { useEffect } from 'react';

interface AssetLocationProps {
  setFieldValue: (
    field: keyof AssetFormDetails,
    value: string | number | undefined | null,
    shouldValidate?: boolean
  ) => void;
  type?: 'create' | 'edit';
}
const AssetLocation = (props: AssetLocationProps) => {
  const {
    countryName,
    stateName,
    lgaName,
    facilityName,
    buildingName,
    floorName,
    departmentName,
    roomName,
    aisleName,
    shelfName,
  } = useAppSelector((state) => state.asset.assetForm);
  const { setFieldValue, type } = props;
  const [field, meta, helpers] = useField('facilityId');
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (meta.value) {
      helpers.setError(undefined);
    }
  }, [meta.value, meta.error]);
  return (
    <FormInputWrapper
      sectionMaxWidth="118px"
      customSpacing="104px"
      description="Specify where the asset is located"
      title="Location"
      isRequired
      direction={{ base: 'column', md: 'row' }}
      formSectionCustomStyle={{
        maxW: { md: '118px' },
      }}
    >
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap="16px"
        width="full"
        id="countryId"
      >
        <GridItem colSpan={4}>
          <Grid templateColumns="repeat(4, 1fr)" width="full" gap="16px">
            {facilityName && (
              <GridItem colSpan={{ base: 4, md: 2 }}>
                <Text
                  py="14px"
                  px="16px"
                  bgColor="neutral.100"
                  rounded="8px"
                  textAlign={facilityName ? 'left' : 'center'}
                  color={facilityName ? 'black' : 'neutral.300'}
                >
                  {[
                    countryName,
                    stateName,
                    lgaName,
                    facilityName,
                    buildingName,
                    floorName,
                    departmentName,
                    roomName,
                    aisleName,
                    shelfName,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </Text>
              </GridItem>
            )}

            <GridItem
              colSpan={{ base: 4, md: 1 }}
              py={{ base: facilityName ? 0 : '50px', md: 0 }}
            >
              <VStack
                alignItems={{ base: 'center', lg: 'flex-start' }}
                justifyContent="center"
                height="full"
              >
                {type === 'create' && (
                  <FormAddButton handleClick={onOpen}>
                    {facilityName ? 'Edit' : 'Add'} Location
                  </FormAddButton>
                )}
                {meta.touched && meta.error !== undefined && (
                  <ErrorMessage>Location is required</ErrorMessage>
                )}
              </VStack>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      <LocationModal
        isOpen={isOpen}
        onClose={onClose}
        setFieldValue={setFieldValue}
      />
    </FormInputWrapper>
  );
};

export default AssetLocation;
