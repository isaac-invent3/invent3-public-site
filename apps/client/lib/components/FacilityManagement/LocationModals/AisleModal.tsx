import { useAppFormik } from '~/lib/hooks/useAppFormik';
/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormikContext } from 'formik';

import {
  Button,
  FormInputWrapper,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import { aisleSchema } from '~/lib/schemas/asset/location.schema';
import BuildingSelect from './LocationSelects/BuildingSelect';
import FloorSelect from './LocationSelects/FloorSelect';
import DepartmentSelect from './LocationSelects/DepartmentSelect';
import RoomSelect from './LocationSelects/RoomSelect';
import {
  CreateBuildingDto,
  CreateDepartmentDto,
  CreateFloorDto,
  CreateRoomDto,
  LocationMasterFormInterface,
} from '~/lib/interfaces/location.interfaces';

interface AisleModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AisleModal = (props: AisleModalProps) => {
  const { isOpen, onClose } = props;
  const { values: currentData, setFieldValue } =
    useFormikContext<LocationMasterFormInterface>();

  const formik = useAppFormik({
    initialValues: {
      buildingId: null!,
      floorId: null!,
      departmentId: null!,
      roomId: null!,
      aisleName: '',
      aisleRef: '',
    },
    validationSchema: aisleSchema(true),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = { ...values, createdBy: session?.user?.username! };
      const buildingIndex = currentData.createBuildingDtos.findIndex(
        (_b, i) => i === values?.buildingId - 1
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

            // Find room
            const roomIndex = department.createRoomDtos?.findIndex(
              (_r, i) => i === values.roomId - 1
            );

            if (roomIndex !== undefined && roomIndex !== -1) {
              const updatedRooms = [...(department.createRoomDtos || [])];
              const room = { ...updatedRooms[roomIndex] } as CreateRoomDto;

              // Remove buildingId, floorId, departmentId, roomId from aisle object
              const {
                buildingId,
                floorId,
                departmentId,
                roomId,
                ...aisleData
              } = finalValue;

              // Add aisle to room
              room.createAisleDtos = [
                ...(room.createAisleDtos || []),
                { createAisleDto: aisleData, createShelveDtos: [] },
              ];

              updatedRooms[roomIndex] = { ...room };
              department.createRoomDtos = updatedRooms;
            }

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
                heading="Add New Aisle"
                subheading="Add a new aisle that is not on the system yet"
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
                <RoomSelect
                  buildingId={
                    formik.values.buildingId ? formik.values.buildingId - 1 : -1
                  }
                  floorId={
                    formik.values.floorId ? formik.values.floorId - 1 : -1
                  }
                  departmentId={
                    formik.values.departmentId
                      ? formik.values.departmentId - 1
                      : -1
                  }
                />
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Aisle Name"
                  description="Input Aisle Name"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="aisleName"
                    type="text"
                    label="Aisle Name"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Aisle Reference"
                  description="Input Aisle Reference"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="aisleRef"
                    type="text"
                    label="Aisle Reference"
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
                <Button type="submit">Add Aisle</Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default AisleModal;
