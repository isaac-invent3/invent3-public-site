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
  const { values } = useFormikContext<LocationMasterFormInterface>();

  const flattenedDepartment = useMemo(() => {
    return (
      values?.createBuildingDtos?.flatMap((building, buildingIdx) => {
        const floors = building?.createFloorDtos ?? [];
        return floors.flatMap((floor, floorIdx) => {
          const departments = floor?.createDepartmentDtos ?? [];
          return departments.map((department) => ({
            buildingName: building.createBuildingDto.buildingName,
            floorName: floor.createFloorDto.floorName,
            departmentName: department.createDepartmentDto.departmentName,
            departmentRef: department.createDepartmentDto.departmentRef,
            buildingId: buildingIdx,
            floorId: floorIdx,
          }));
        });
      }) ?? []
    );
  }, [values?.createBuildingDtos]);

  const columnHelper = createColumnHelper<{
    buildingId: number;
    floorId: number;
    buildingName: string;
    floorName: string;
    departmentRef: string | null;
    departmentName: string;
  }>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('departmentRef', {
        cell: (info) => info.getValue(),
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
        cell: () => <PopoverAction />,
        header: 'Action',
        enableSorting: false,
      }),
    ],
    []
  );

  return (
    <>
      <VStack
        spacing={{ base: '24px', lg: '43px' }}
        width="full"
        alignItems="center"
        bgColor="white"
        pt={{ base: '16px', lg: '19px' }}
        pl={{ md: '24px', lg: '28px' }}
        pb={{ base: '16px', lg: '33px' }}
        pr={{ md: '24px', lg: '38px' }}
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
