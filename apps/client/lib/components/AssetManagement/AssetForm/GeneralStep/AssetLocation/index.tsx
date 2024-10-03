/* eslint-disable no-unused-vars */
import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import SectionInfo from '../../SectionInfo';
import AddButton from '../../AddButton';
import LocationModal from './Modals/LocationModal';
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import { useField } from 'formik';
import { useAppSelector } from '~/lib/redux/hooks';
import { useEffect } from 'react';

interface AssetLocationProps {
  setFieldValue: (
    field: keyof AssetFormDetails,
    value: string | number | undefined | null,
    shouldValidate?: boolean
  ) => void;
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
  const { setFieldValue } = props;
  const [field, meta, helpers] = useField('facilityId');
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (meta.value) {
      helpers.setError(undefined);
    }
  }, [meta.value, meta.error]);
  return (
    <HStack
      width="full"
      alignItems="flex-start"
      spacing="104px"
      position="relative"
    >
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Location"
          info="Specify where the asset is located"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap="16px" width="full">
        <GridItem colSpan={4}>
          <Grid templateColumns="repeat(4, 1fr)" width="full" gap="16px">
            {facilityName && (
              <GridItem colSpan={2}>
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

            <GridItem colSpan={1}>
              <VStack
                alignItems="flex-start"
                justifyContent="center"
                height="full"
              >
                <AddButton handleClick={onOpen}>
                  {facilityName ? 'Edit' : 'Add'} Location
                </AddButton>
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
    </HStack>
  );
};

export default AssetLocation;
