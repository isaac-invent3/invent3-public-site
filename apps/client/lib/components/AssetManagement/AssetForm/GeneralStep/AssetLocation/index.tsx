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
import { FormikErrors } from 'formik';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import CountrySelect from './CountrySelect';
import StateSelect from './StateSelect';
import LGASelect from './LGASelect';
import { useState } from 'react';
import { updateAssetForm } from '~/lib/redux/slices/assetSlice';

interface AssetLocationProps {
  errors: FormikErrors<AssetFormDetails>;
  setFieldValue: (
    field: keyof AssetFormDetails,
    value: string | number | undefined | null,
    shouldValidate?: boolean
  ) => void;
}
const AssetLocation = (props: AssetLocationProps) => {
  const dispatch = useAppDispatch();
  const { countryId, stateId } = useAppSelector(
    (state) => state.asset.assetForm
  );
  const [selectedCountry, setSelectedCountry] = useState<number | null>(
    countryId
  );
  const [selectedState, setSelectedState] = useState<number | null>(stateId);
  const {
    facilityName,
    buildingName,
    floorName,
    departmentName,
    roomName,
    aisleName,
    shelfName,
  } = useAppSelector((state) => state.asset.assetForm);
  const { errors, setFieldValue } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

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
        <GridItem colSpan={4} width="full">
          <HStack width="full" alignItems="flex-start" spacing="16px">
            <CountrySelect
              handleSelect={(option) => {
                setSelectedCountry(option.value as number);
                dispatch(
                  updateAssetForm({
                    countryName: option.label,
                  })
                );
              }}
            />
            <StateSelect
              countryId={selectedCountry}
              handleSelect={(option) => {
                setSelectedState(option.value as number);
                dispatch(
                  updateAssetForm({
                    stateName: option.label,
                  })
                );
              }}
            />
            <LGASelect
              stateId={selectedState}
              handleSelect={(option) => {
                dispatch(
                  updateAssetForm({
                    lgaName: option.label,
                  })
                );
              }}
            />
          </HStack>
        </GridItem>

        <GridItem colSpan={4}>
          <Grid templateColumns="repeat(3, 1fr)" width="full" gap="16px">
            <GridItem colSpan={2}>
              <Text
                py="14px"
                px="16px"
                bgColor="neutral.100"
                rounded="8px"
                textAlign={facilityName ? 'left' : 'center'}
                color={facilityName ? 'black' : 'neutral.300'}
              >
                {facilityName
                  ? [
                      facilityName,
                      buildingName,
                      floorName,
                      departmentName,
                      roomName,
                      aisleName,
                      shelfName,
                    ]
                      .filter(Boolean)
                      .join(', ')
                  : 'No Location added yet'}
              </Text>
            </GridItem>

            <GridItem colSpan={1}>
              <VStack
                alignItems="flex-start"
                justifyContent="center"
                height="full"
              >
                <AddButton handleClick={onOpen}>
                  {facilityName ? 'Edit' : 'Add'} Location
                </AddButton>
                {!facilityName && errors.facilityId && (
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
