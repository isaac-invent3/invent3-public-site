import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import SelectInput from '~/lib/components/UI/Select';
import { locationSchema } from '~/lib/schemas/asset.schema';
import { categoryData } from '~/lib/utils/MockData/asset';
import AddButton from '../../../AddButton';
import Button from '~/lib/components/UI/Button';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const LocationModal = (props: LocationModalProps) => {
  const { isOpen, onClose } = props;

  const formik = useFormik({
    initialValues: {
      facilityId: '',
      buildingId: '',
      floorId: '',
      departmentId: '',
      roomId: '',
      aisleId: '',
      shelfId: '',
    },
    validationSchema: locationSchema,
    onSubmit: async () => {},
  });
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { sm: '450px' } }}
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
                  options={categoryData}
                  isSearchable
                />
                <AddButton handleClick={() => {}}>Add New Faculty</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="buildingId"
                  title="Building"
                  options={categoryData}
                  isSearchable
                />
                <AddButton handleClick={() => {}}>Add New Building</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="floorId"
                  title="Floor"
                  options={categoryData}
                  isSearchable
                />
                <AddButton handleClick={() => {}}>Add New Floor</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="departmentId"
                  title="Department/Unit/Team"
                  options={categoryData}
                  isSearchable
                />
                <AddButton handleClick={() => {}}>Add New Department</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="roomId"
                  title="Room/Section"
                  options={categoryData}
                  isSearchable
                />
                <AddButton handleClick={() => {}}>Add New Room</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="aisleId"
                  title="Aisle"
                  options={categoryData}
                  isSearchable
                />
                <AddButton handleClick={() => {}}>Add New Aisle</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="shelfId"
                  title="Shelf"
                  options={categoryData}
                  isSearchable
                />
                <AddButton handleClick={() => {}}>Add New Shelf</AddButton>
              </VStack>
            </VStack>
            {/* Main Form Ends Here */}
            <HStack width="full" spacing="24px">
              <Button
                variant="secondary"
                customStyles={{ width: '96px' }}
                handleClick={onClose}
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
