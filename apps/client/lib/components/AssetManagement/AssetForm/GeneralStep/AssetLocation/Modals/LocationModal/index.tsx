/* eslint-disable no-unused-vars */
import { HStack, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import { locationSchema } from '~/lib/schemas/asset/location.schema';
import Button from '~/lib/components/UI/Button';
import {
  AssetFormDetails,
  FormLocation,
} from '~/lib/interfaces/asset.interfaces';
import { Option } from '~/lib/interfaces/general.interfaces';
import ModalHeading from '../../../../../../UI/ModalHeading';
import Facility from './Facility';
import Building from './Building';
import Floor from './Floor';
import Department from './Department';
import Room from './Room';
import Aisle from './Aisle';
import Shelf from './Shelf';
import { resetDependentFields, resetFormikFields } from './utility';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/assetSlice';

const intialState = {
  label: undefined,
  value: undefined,
};

const locationInitialState = {
  facility: intialState,
  building: intialState,
  floor: intialState,
  department: intialState,
  room: intialState,
  aisle: intialState,
  shelf: intialState,
};

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  setFieldValue: (
    field: keyof AssetFormDetails,
    value: string | number | undefined,
    shouldValidate?: boolean
  ) => void;
}
const LocationModal = (props: LocationModalProps) => {
  const { isOpen, onClose, setFieldValue } = props;
  const assetFormDetails = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();
  const [localLocation, setLocalLocation] = useState<FormLocation>({
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
  };

  const handleCancel = () => {
    setLocalLocation(locationInitialState);
    onClose();
  };
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { sm: '450px' } }}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack width="full" spacing="32px" p="40px">
            <ModalHeading
              heading="Add Location"
              subheading=" You are required to add atleast 4 levels for the asset location"
            />

            {/* Main Form Starts Here */}
            <VStack width="full" spacing="16px">
              <Facility handleReadableLocation={handleReadableLocation} />
              <Building
                handleReadableLocation={handleReadableLocation}
                facilityId={localLocation.facility.value}
              />
              <Floor
                handleReadableLocation={handleReadableLocation}
                buildingId={localLocation.building.value}
              />
              <Department
                handleReadableLocation={handleReadableLocation}
                floorId={localLocation.floor.value}
              />
              <Room
                handleReadableLocation={handleReadableLocation}
                departmentId={localLocation.department.value}
              />
              <Aisle
                handleReadableLocation={handleReadableLocation}
                roomId={localLocation.room.value}
              />
              <Shelf
                handleReadableLocation={handleReadableLocation}
                aisleId={localLocation.aisle.value}
              />
            </VStack>
            {/* Main Form Ends Here */}
            <HStack width="full" spacing="24px">
              <Button
                variant="secondary"
                customStyles={{ width: '96px' }}
                handleClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type="submit">Add Location</Button>
            </HStack>
          </VStack>
        </form>
      </FormikProvider>
    </GenericModal>
  );
};

export default LocationModal;
