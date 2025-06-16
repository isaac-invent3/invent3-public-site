import { useDisclosure, VStack } from '@chakra-ui/react';
import { DataTable, FormAddButton } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import { LocationMasterFormInterface } from '~/lib/interfaces/location.interfaces';
import PopoverAction from '../PopoverAction';
import DepartmentModal from '../../LocationModals/DepartmentModal';

interface DepartmentStepProps {
  activeStep: number;
}
const DepartmentStep = (props: DepartmentStepProps) => {
  const { activeStep } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { values, setFieldValue } =
    useFormikContext<LocationMasterFormInterface>();

  const flattenedDepartment = useMemo(() => {
    return (
      values?.createBuildingDtos?.flatMap((building, buildingIdx) => {
        const floors = building?.createFloorDtos ?? [];
        return floors.flatMap((floor, floorIdx) => {
          const departments = floor?.createDepartmentDtos ?? [];
          return departments.map((department, departmentIdx) => ({
            buildingName: building.createBuildingDto.buildingName,
            floorName: floor.createFloorDto.floorName,
            departmentName: department.createDepartmentDto.departmentName,
            departmentRef: department.createDepartmentDto.departmentRef,
            buildingIndex: buildingIdx,
            floorIndex: floorIdx,
            departmentIndex: departmentIdx,
          }));
        });
      }) ?? []
    );
  }, [values?.createBuildingDtos]);

  const handleDelete = (
    buildingIndex: number,
    floorIndex: number,
    departmentIndex: number
  ) => {
    const updatedBuildings = [...(values.createBuildingDtos ?? [])];
    if (
      updatedBuildings[buildingIndex] &&
      Array.isArray(updatedBuildings[buildingIndex].createFloorDtos)
    ) {
      const updatedFloors = [
        ...updatedBuildings[buildingIndex].createFloorDtos,
      ];
      if (
        updatedFloors[floorIndex] &&
        Array.isArray(updatedFloors[floorIndex]?.createDepartmentDtos)
      ) {
        const updatedDepartments = [
          ...(updatedFloors[floorIndex]?.createDepartmentDtos ?? []),
        ];
        if (
          departmentIndex >= 0 &&
          departmentIndex < updatedDepartments.length
        ) {
          updatedDepartments.splice(departmentIndex, 1);
          updatedFloors[floorIndex] = {
            ...updatedFloors[floorIndex],
            createDepartmentDtos: updatedDepartments,
          };
          updatedBuildings[buildingIndex] = {
            ...updatedBuildings[buildingIndex],
            createFloorDtos: updatedFloors,
          };
          setFieldValue('createBuildingDtos', updatedBuildings);
        }
      }
    }
  };

  const columnHelper = createColumnHelper<{
    buildingIndex: number;
    floorIndex: number;
    departmentIndex: number;
    buildingName: string;
    floorName: string;
    departmentRef: string | null;
    departmentName: string;
  }>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('departmentRef', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Department Ref',
        enableSorting: false,
      }),
      columnHelper.accessor('departmentName', {
        cell: (info) => info.getValue(),
        header: 'Department Name',
        enableSorting: false,
      }),
      columnHelper.accessor('buildingName', {
        cell: (info) => info.getValue(),
        header: 'Building Name',
        enableSorting: false,
      }),
      columnHelper.accessor('floorName', {
        cell: (info) => info.getValue(),
        header: 'Floor Name',
        enableSorting: false,
      }),
      columnHelper.display({
        id: 'action',
        cell: (info) => (
          <PopoverAction
            handleDelete={() =>
              handleDelete(
                info.row.original.buildingIndex,
                info.row.original.floorIndex,
                info.row.original.departmentIndex
              )
            }
          />
        ),
        header: 'Action',
        enableSorting: false,
      }),
    ],
    [flattenedDepartment]
  );

  return (
    <>
      <VStack
        spacing={{ base: '24px', lg: '43px' }}
        width="full"
        alignItems="center"
        bgColor="white"
        p="8px"
        rounded="6px"
        minH={{ lg: '60vh' }}
        display={activeStep === 4 ? 'flex' : 'none'}
      >
        <DataTable
          columns={columns}
          data={flattenedDepartment ?? []}
          showFooter={false}
          showEmptyState={false}
          customTdStyle={{
            paddingLeft: '16px',
            paddingTop: '12px',
            paddingBottom: '12px',
            bgColor: '#f2f1f1',
          }}
        />
        <FormAddButton handleClick={onOpen} customStyle={{ my: '40px' }}>
          Add New Department
        </FormAddButton>
      </VStack>
      <DepartmentModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default DepartmentStep;
