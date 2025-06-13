/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik, useFormikContext } from 'formik';

import {
  Button,
  FormInputWrapper,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import { roomSchema } from '~/lib/schemas/asset/location.schema';
import BuildingSelect from './LocationSelects/BuildingSelect';
import FloorSelect from './LocationSelects/FloorSelect';
import DepartmentSelect from './LocationSelects/DepartmentSelect';
import {
  CreateBuildingDto,
  CreateDepartmentDto,
  CreateFloorDto,
  LocationMasterFormInterface,
} from '~/lib/interfaces/location.interfaces';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const RoomModal = (props: RoomModalProps) => {
  const { isOpen, onClose } = props;
  const { values: currentData, setFieldValue } =
    useFormikContext<LocationMasterFormInterface>();

  const formik = useFormik({
    initialValues: {
      buildingId: null!,
      floorId: null!,
      departmentId: null!,
      roomName: '',
      roomRef: '',
    },
    validationSchema: roomSchema(true),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = { ...values, createdBy: session?.user?.username! };
      const buildingIndex = currentData.createBuildingDtos.findIndex(
        (_b, i) => i === values.buildingId - 1
      );

      if (buildingIndex !== -1) {
        const updatedBuildings = [...currentData.createBuildingDtos];
        const building = {
          ...updatedBuildings[buildingIndex],
        } as CreateBuildingDto;

        // Check if floorId exists
        const floorIndex = building.createFloorDtos?.findIndex(
          (_f, i) => i === values.floorId - 1
        );

        if (floorIndex !== undefined && floorIndex !== -1) {
          const updatedFloors = [...(building.createFloorDtos || [])];
          const floor = { ...updatedFloors[floorIndex] } as CreateFloorDto;

          // Find department
          const departmentIndex = floor.createDepartmentDtos?.findIndex(
            (_d, i) => i === values.departmentId - 1
          );

          if (departmentIndex !== undefined && departmentIndex !== -1) {
            const updatedDepartments = [...(floor.createDepartmentDtos || [])];
            const department = {
              ...updatedDepartments[departmentIndex],
            } as CreateDepartmentDto;

            // Remove buildingId, floorId, departmentId from room object
            const { buildingId, floorId, departmentId, ...roomData } =
              finalValue;

            // Add room to department
            department.createRoomDtos = [
              ...(department.createRoomDtos || []),
              { createRoomDto: roomData, createAisleDtos: [] },
            ];

            updatedDepartments[departmentIndex] = { ...department };
            floor.createDepartmentDtos = updatedDepartments;
          }

          updatedFloors[floorIndex] = { ...floor };
          building.createFloorDtos =
            updatedFloors as typeof building.createFloorDtos;
        }

        updatedBuildings[buildingIndex] = { ...building };
        setFieldValue('createBuildingDtos', updatedBuildings);
      }
      resetForm();
      onClose();
    },
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { sm: '450px' } }}
    >
      <ModalBody p={0} m={0} width="full">
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              width="full"
              spacing="32px"
              py={{ base: '24px', md: '40px' }}
              px="20px"
            >
              <ModalHeading
                heading="Add New Room"
                subheading="Add a new room that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <BuildingSelect />
                <FloorSelect
                  buildingId={
                    formik.values.buildingId ? formik.values.buildingId - 1 : -1
                  }
                />
                <DepartmentSelect
                  buildingId={
                    formik.values.buildingId ? formik.values.buildingId - 1 : -1
                  }
                  floorId={
                    formik.values.floorId ? formik.values.floorId - 1 : -1
                  }
                />
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Room Name"
                  description="Input Room name"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="roomName"
                    type="text"
                    label="Room Name"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Room Reference"
                  description="Input Room Reference"
                >
                  <Field
                    as={FormTextInput}
                    name="roomRef"
                    type="text"
                    label="Room Reference"
                  />
                </FormInputWrapper>
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
                <Button type="submit">Add Room</Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default RoomModal;
