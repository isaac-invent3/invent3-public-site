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

const locationInitialState = {
  facility: '',
  building: '',
  floor: '',
  department: '',
  room: '',
  aisle: '',
  shelf: '',
};

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  setLocation: React.Dispatch<React.SetStateAction<FormLocation>>;
  setFieldValue: (
    field: keyof AssetFormDetails,
    value: string | number | null,
    shouldValidate?: boolean
  ) => void;
}
const LocationModal = (props: LocationModalProps) => {
  const { isOpen, onClose, setLocation, setFieldValue } = props;
  const [localLocation, setLocalLocation] =
    useState<FormLocation>(locationInitialState);

  const formik = useFormik({
    initialValues: {
      facilityId: null,
      buildingId: null,
      floorId: null,
      departmentId: null,
      roomId: null,
      aisleId: null,
      shelfId: null,
    },
    validationSchema: locationSchema,
    onSubmit: async (values) => {
      Object.entries(values).map(([key, value]) => {
        setFieldValue(key as keyof AssetFormDetails, value, true);
      });
      setLocation(localLocation);
      onClose();
    },
  });

  const handleReadableLocation = (option: Option, key: keyof FormLocation) => {
    setLocalLocation((prev) => ({ ...prev, [key]: option.label }));
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
              <Building handleReadableLocation={handleReadableLocation} />
              <Floor handleReadableLocation={handleReadableLocation} />
              <Department handleReadableLocation={handleReadableLocation} />
              <Room handleReadableLocation={handleReadableLocation} />
              <Aisle handleReadableLocation={handleReadableLocation} />
              <Shelf handleReadableLocation={handleReadableLocation} />
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
