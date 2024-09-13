/* eslint-disable no-unused-vars */
import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import SelectInput from '~/lib/components/UI/Select';
import { locationSchema } from '~/lib/schemas/asset.schema';
import AddButton from '../../../AddButton';
import Button from '~/lib/components/UI/Button';
import {
  useGetAllAislesQuery,
  useGetAllBuildingsQuery,
  useGetAllDepartmentsQuery,
  useGetAllFacilitiesQuery,
  useGetAllFloorsQuery,
  useGetAllRoomsQuery,
  useGetAllShelvesQuery,
} from '~/lib/redux/services/asset/location.services';
import { generateOptions } from '~/lib/utils/helperFunctions';
import {
  AssetFormDetails,
  FormLocation,
} from '~/lib/interfaces/asset.interfaces';
import { Option } from '~/lib/interfaces/general.interfaces';

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
  const searchPayload = { pageSize: 25 };
  const [localLocation, setLocalLocation] =
    useState<FormLocation>(locationInitialState);

  const { data: facilityData, isLoading: isLoadingFacility } =
    useGetAllFacilitiesQuery(searchPayload);
  const { data: buildingData, isLoading: isLoadingBuilding } =
    useGetAllBuildingsQuery(searchPayload);
  const { data: floorData, isLoading: isLoadingFloor } =
    useGetAllFloorsQuery(searchPayload);
  const { data: departmentData, isLoading: isLoadingDepartment } =
    useGetAllDepartmentsQuery(searchPayload);
  const { data: roomData, isLoading: isLoadingRoom } =
    useGetAllRoomsQuery(searchPayload);
  const { data: aisleData, isLoading: isLoadingAisle } =
    useGetAllAislesQuery(searchPayload);
  const { data: shelfData, isLoading: isLoadingShelf } =
    useGetAllShelvesQuery(searchPayload);

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
      console.log(values);
      Object.entries(values).map(([key, value]) => {
        setFieldValue(key as keyof AssetFormDetails, value, true);
      });
      setLocation(localLocation);
      console.log('it came here');
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
      mainModalStyle={{ closeOnOverlayClick: false }}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack width="full" spacing="32px" p="40px">
            <VStack width="full" alignItems="flex-start" spacing="8px">
              <Heading
                fontWeight={800}
                fontSize="32px"
                lineHeight="38.02px"
                color="primary"
              >
                Add Location
              </Heading>
              <Text size="md" fontWeight={400} color="neutral.600">
                You are required to add atleast 4 levels for the asset location
              </Text>
            </VStack>
            {/* Main Form Starts Here */}
            <VStack width="full" spacing="16px">
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="facilityId"
                  title="Facility/Site"
                  options={generateOptions(
                    facilityData?.data?.items,
                    'facilityName',
                    'facilityId'
                  )}
                  isLoading={isLoadingFacility}
                  isSearchable
                  handleSelect={(option) =>
                    handleReadableLocation(option, 'facility')
                  }
                />
                <AddButton handleClick={() => {}}>Add New Faculty</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="buildingId"
                  title="Building"
                  options={generateOptions(
                    buildingData?.data?.items,
                    'buildingName',
                    'buildingId'
                  )}
                  handleSelect={(option) =>
                    handleReadableLocation(option, 'building')
                  }
                  isLoading={isLoadingBuilding}
                  isSearchable
                />
                <AddButton handleClick={() => {}}>Add New Building</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="floorId"
                  title="Floor"
                  options={generateOptions(
                    floorData?.data?.items,
                    'floorName',
                    'floorId'
                  )}
                  isLoading={isLoadingFloor}
                  isSearchable
                  handleSelect={(option) =>
                    handleReadableLocation(option, 'floor')
                  }
                />
                <AddButton handleClick={() => {}}>Add New Floor</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="departmentId"
                  title="Department/Unit/Team"
                  options={generateOptions(
                    departmentData?.data?.items,
                    'departmentName',
                    'departmentId'
                  )}
                  isLoading={isLoadingDepartment}
                  isSearchable
                  handleSelect={(option) =>
                    handleReadableLocation(option, 'department')
                  }
                />
                <AddButton handleClick={() => {}}>Add New Department</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="roomId"
                  title="Room/Section"
                  options={generateOptions(
                    roomData?.data?.items,
                    'roomName',
                    'roomId'
                  )}
                  isLoading={isLoadingRoom}
                  isSearchable
                  handleSelect={(option) =>
                    handleReadableLocation(option, 'room')
                  }
                />
                <AddButton handleClick={() => {}}>Add New Room</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="aisleId"
                  title="Aisle"
                  options={generateOptions(
                    aisleData?.data?.items,
                    'aisleName',
                    'aisleId'
                  )}
                  isLoading={isLoadingAisle}
                  isSearchable
                  handleSelect={(option) =>
                    handleReadableLocation(option, 'aisle')
                  }
                />
                <AddButton handleClick={() => {}}>Add New Aisle</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="shelfId"
                  title="Shelf"
                  options={generateOptions(
                    shelfData?.data?.items,
                    'shelfName',
                    'shelfId'
                  )}
                  isLoading={isLoadingShelf}
                  isSearchable
                  handleSelect={(option) =>
                    handleReadableLocation(option, 'shelf')
                  }
                />
                <AddButton handleClick={() => {}}>Add New Shelf</AddButton>
              </VStack>
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
