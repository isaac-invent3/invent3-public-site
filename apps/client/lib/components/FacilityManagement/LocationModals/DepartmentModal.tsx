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
import { departmentSchema } from '~/lib/schemas/asset/location.schema';
import {
  CreateBuildingDto,
  CreateFloorDto,
  LocationMasterFormInterface,
} from '~/lib/interfaces/location.interfaces';
import BuildingSelect from './LocationSelects/BuildingSelect';
import FloorSelect from './LocationSelects/FloorSelect';

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const DepartmentModal = (props: DepartmentModalProps) => {
  const { isOpen, onClose } = props;
  const { values: currentData, setFieldValue } =
    useFormikContext<LocationMasterFormInterface>();

  const formik = useFormik({
    initialValues: {
      buildingId: null!,
      floorId: null!,
      departmentName: '',
      departmentRef: '',
    },
    validationSchema: departmentSchema(true),
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
          // Add department to existing floor
          const updatedFloors = [...(building.createFloorDtos || [])];
          const floor = { ...updatedFloors[floorIndex] } as CreateFloorDto;
          // Remove buildingId and floorId from department object
          const { buildingId, floorId, ...departmentData } = finalValue;
          floor.createDepartmentDtos = [
            ...(floor.createDepartmentDtos || []),
            {
              createDepartmentDto: departmentData,
              createRoomDtos: [],
            },
          ];
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
                heading="Add New Department"
                subheading="Add a new department that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <BuildingSelect />
                <FloorSelect
                  buildingId={
                    formik.values.buildingId ? formik.values.buildingId - 1 : -1
                  }
                />
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Department Name"
                  description="Input Department name"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="departmentName"
                    type="text"
                    label="Department Name"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Department Reference"
                  description="Input Department Reference."
                >
                  <Field
                    as={FormTextInput}
                    name="departmentRef"
                    type="text"
                    label="Department Reference"
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
                <Button type="submit">Add Department</Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default DepartmentModal;
