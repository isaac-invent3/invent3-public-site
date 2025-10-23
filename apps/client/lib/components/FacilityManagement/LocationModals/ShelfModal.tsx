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
import { shelfSchema } from '~/lib/schemas/asset/location.schema';
import BuildingSelect from './LocationSelects/BuildingSelect';
import FloorSelect from './LocationSelects/FloorSelect';
import DepartmentSelect from './LocationSelects/DepartmentSelect';
import RoomSelect from './LocationSelects/RoomSelect';
import AisleSelect from './LocationSelects/AisleSelect';
import {
  CreateAisleDto,
  CreateBuildingDto,
  CreateDepartmentDto,
  CreateFloorDto,
  CreateRoomDto,
  LocationMasterFormInterface,
} from '~/lib/interfaces/location.interfaces';

interface ShelfModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ShelfModal = (props: ShelfModalProps) => {
  const { isOpen, onClose } = props;
  const { values: currentData, setFieldValue } =
    useFormikContext<LocationMasterFormInterface>();

  const formik = useAppFormik({
    initialValues: {
      buildingId: null!,
      floorId: null!,
      departmentId: null!,
      roomId: null!,
      aisleId: null!,
      shelfName: '',
      shelfRef: '',
    },
    validationSchema: shelfSchema(true),
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

              // Remove buildingId, floorId, departmentId, roomId from shelf object
              const {
                buildingId,
                floorId,
                departmentId,
                roomId,
                aisleId,
                ...data
              } = finalValue;

              // Find aisle
              const aisleIndex = room.createAisleDtos?.findIndex(
                (_a, i) => i === values.aisleId - 1
              );

              if (aisleIndex !== undefined && aisleIndex !== -1) {
                const updatedAisles = [...(room.createAisleDtos || [])];
                const aisle = {
                  ...updatedAisles[aisleIndex],
                } as CreateAisleDto;

                // Add shelf to aisle
                aisle.createShelveDtos = [
                  ...(aisle.createShelveDtos || []),
                  {
                    createShelfDto: {
                      ...data,
                    },
                  },
                ];

                updatedAisles[aisleIndex] = { ...aisle };
                room.createAisleDtos = updatedAisles;
              }

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
                heading="Add New Shelf"
                subheading="Add a new shelf that is not on the system yet"
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
                <AisleSelect
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
                  roomId={formik.values.roomId ? formik.values.roomId - 1 : -1}
                />
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Shelf Name"
                  description="Input Shelf Name"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="shelfName"
                    type="text"
                    label="Shelf Name"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Shelf Reference"
                  description="Input Shelf Reference"
                >
                  <Field
                    as={FormTextInput}
                    name="shelfRef"
                    type="text"
                    label="Shelf Reference"
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
                <Button type="submit">Add Shelf</Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default ShelfModal;
