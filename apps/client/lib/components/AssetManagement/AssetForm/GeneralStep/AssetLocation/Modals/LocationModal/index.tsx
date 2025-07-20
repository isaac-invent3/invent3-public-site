/* eslint-disable no-unused-vars */
import {
  Flex,
  HStack,
  ModalBody,
  SimpleGrid,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { locationSchema } from '~/lib/schemas/asset/location.schema';
import { Button, GenericModal, ModalHeading } from '@repo/ui/components';
import { AssetFormDetails } from '~/lib/interfaces/asset/general.interface';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import { Option } from '~/lib/interfaces/general.interfaces';
import Facility from './Facility';
import Building from './Building';
import Floor from './Floor';
import Department from './Department';
import Room from './Room';
import Aisle from './Aisle';
import Shelf from './Shelf';
import { resetDependentFields, resetFormikFields } from './utility';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import LGASelect from '../../../../../../Common/SelectComponents/Location/LGASelect';
import StateSelect from '../../../../../../Common/SelectComponents/Location/StateSelect';
import CountrySelect from '../../../../../../Common/SelectComponents/Location/CountrySelect';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  setFieldValue: (
    field: keyof AssetFormDetails,
    value: string | number | undefined | null,
    shouldValidate?: boolean
  ) => void;
}
const LocationModal = (props: LocationModalProps) => {
  const { isOpen, onClose, setFieldValue } = props;
  const assetFormDetails = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();
  const [localLocation, setLocalLocation] = useState<FormLocation>({
    country: {
      label: assetFormDetails.countryName,
      value: assetFormDetails.countryId,
    },
    state: {
      label: assetFormDetails.stateName,
      value: assetFormDetails.stateId,
    },
    lga: {
      label: assetFormDetails.lgaName,
      value: assetFormDetails.lgaId,
    },
    facility: {
      label: assetFormDetails.facilityName,
      value: assetFormDetails.facilityId,
    },
    building: {
      label: assetFormDetails.buildingName,
      value: assetFormDetails.buildingId,
    },
    floor: {
      label: assetFormDetails.floorName,
      value: assetFormDetails.floorId,
    },
    department: {
      label: assetFormDetails.departmentName,
      value: assetFormDetails.departmentId,
    },
    room: {
      label: assetFormDetails.roomName,
      value: assetFormDetails.roomId,
    },
    aisle: {
      label: assetFormDetails.aisleName,
      value: assetFormDetails.aisleId,
    },
    shelf: {
      label: assetFormDetails.shelfName,
      value: assetFormDetails.shelfId,
    },
  });

  const formik = useFormik({
    initialValues: {
      countryId: assetFormDetails.countryId,
      stateId: assetFormDetails.stateId,
      lgaId: assetFormDetails.lgaId,
      facilityId: assetFormDetails.facilityId,
      buildingId: assetFormDetails.buildingId,
      floorId: assetFormDetails.facilityId,
      departmentId: assetFormDetails.facilityId,
      roomId: assetFormDetails.facilityId,
      aisleId: assetFormDetails.facilityId,
      shelfId: assetFormDetails.facilityId,
    },
    validationSchema: locationSchema,
    onSubmit: async (values) => {
      Object.entries(values).map(([key, value]) => {
        setFieldValue(key as keyof AssetFormDetails, value, true);
      });
      dispatch(
        updateAssetForm({
          countryName: localLocation.country.label,
          stateName: localLocation.state.label,
          lgaName: localLocation.lga.label,
          facilityName: localLocation.facility.label,
          buildingName: localLocation.building.label,
          floorName: localLocation.floor.label,
          departmentName: localLocation.department.label,
          roomName: localLocation.room.label,
          aisleName: localLocation.aisle.label,
          shelfName: localLocation.shelf.label,
        })
      );
      onClose();
    },
  });

  const handleReadableLocation = (option: Option, key: keyof FormLocation) => {
    if (localLocation[key].value !== option.value) {
      // Update localLocation as before
      setLocalLocation((prev) => ({
        ...prev,
        [key]: option,
        ...resetDependentFields(key), // Reset dependent fields in localLocation
      }));

      // Reset formik fields based on the hierarchy
      formik.setValues((prevValues) => ({
        ...prevValues,
        [key]: option.value, // Set the current key's value
        ...resetFormikFields(`${key}Id`), // Reset dependent formik fields
      }));
    }
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { md: '605px' } }}
    >
      <ModalBody p={0} m={0} width="full">
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              width="full"
              spacing="32px"
              p={{ base: '24px', md: '40px' }}
            >
              <ModalHeading
                heading="Add Location"
                subheading=" You are required to add atleast 4 levels for the asset location"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <SimpleGrid
                  width="full"
                  alignItems="flex-start"
                  spacing="8px"
                  columns={{ base: 1, md: 3 }}
                >
                  <CountrySelect
                    handleSelect={(option) => {
                      handleReadableLocation(option, 'country');
                    }}
                  />
                  <StateSelect
                    countryId={localLocation.country.value}
                    handleSelect={(option) => {
                      handleReadableLocation(option, 'state');
                    }}
                  />
                  <LGASelect
                    stateId={localLocation.state.value}
                    handleSelect={(option) =>
                      handleReadableLocation(option, 'lga')
                    }
                    type="specificById"
                  />
                </SimpleGrid>
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  width="full"
                  spacing="16px"
                >
                  <Facility
                    handleReadableLocation={handleReadableLocation}
                    lgaId={localLocation.lga.value}
                    stateId={localLocation.state.value}
                  />
                  <Building
                    handleReadableLocation={handleReadableLocation}
                    facilityId={localLocation.facility.value}
                  />
                </Stack>
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  width="full"
                  spacing="16px"
                >
                  <Floor
                    handleReadableLocation={handleReadableLocation}
                    buildingId={localLocation.building.value}
                  />
                  <Department
                    handleReadableLocation={handleReadableLocation}
                    floorId={localLocation.floor.value}
                  />
                </Stack>
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  width="full"
                  spacing="16px"
                >
                  <Room
                    handleReadableLocation={handleReadableLocation}
                    departmentId={localLocation.department.value}
                  />
                  <Aisle
                    handleReadableLocation={handleReadableLocation}
                    roomId={localLocation.room.value}
                  />
                </Stack>
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  width="full"
                  spacing="16px"
                >
                  <Flex width="50%">
                    <Shelf
                      handleReadableLocation={handleReadableLocation}
                      aisleId={localLocation.aisle.value}
                    />
                  </Flex>
                </Stack>
              </VStack>
              {/* Main Form Ends Here */}
              <Flex width="full" justifyContent="flex-end">
                <HStack width="370px" spacing="24px">
                  <Button
                    variant="secondary"
                    customStyles={{ width: '96px' }}
                    handleClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Location</Button>
                </HStack>
              </Flex>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default LocationModal;
