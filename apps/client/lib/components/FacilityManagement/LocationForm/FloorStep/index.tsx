import { useDisclosure, VStack } from '@chakra-ui/react';
import { DataTable, FormAddButton } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import { LocationMasterFormInterface } from '~/lib/interfaces/location.interfaces';
import PopoverAction from '../PopoverAction';
import Floor from '../../LocationModals/FloorModal';

interface FloorStepProps {
  activeStep: number;
}
const FloorStep = (props: FloorStepProps) => {
  const { activeStep } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { values, setFieldValue } =
    useFormikContext<LocationMasterFormInterface>();

  const flattenedFloors = useMemo(() => {
    return (
      values?.createBuildingDtos?.flatMap((building, bIndex) => {
        const floors = building?.createFloorDtos ?? [];
        return floors.map((floor, fIndex) => ({
          buildingName: building.createBuildingDto.buildingName,
          floorName: floor.createFloorDto.floorName,
          floorRef: floor.createFloorDto.floorRef,
          buildingIndex: bIndex,
          floorIndex: fIndex,
        }));
      }) ?? []
    );
  }, [values?.createBuildingDtos]);

  const handleDelete = (buildingIndex: number, floorIndex: number) => {
    const updatedBuildings = [...(values.createBuildingDtos ?? [])];
    if (
      updatedBuildings[buildingIndex] &&
      Array.isArray(updatedBuildings[buildingIndex].createFloorDtos)
    ) {
      const updatedFloors = [
        ...updatedBuildings[buildingIndex].createFloorDtos,
      ];
      updatedFloors.splice(floorIndex, 1);
      updatedBuildings[buildingIndex] = {
        ...updatedBuildings[buildingIndex],
        createFloorDtos: updatedFloors,
      };
      setFieldValue('createBuildingDtos', updatedBuildings);
    }
  };

  const columnHelper = createColumnHelper<{
    buildingName: string;
    floorName: string;
    floorRef: string | null;
    buildingIndex: number;
    floorIndex: number;
  }>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('floorRef', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Floor Ref',
        enableSorting: false,
      }),
      columnHelper.accessor('floorName', {
        cell: (info) => info.getValue(),
        header: 'Floor Name',
        enableSorting: false,
      }),
      columnHelper.accessor('buildingName', {
        cell: (info) => info.getValue(),
        header: 'Building Name',
        enableSorting: false,
      }),
      columnHelper.display({
        id: 'action',
        cell: (info) => (
          <PopoverAction
            handleDelete={() =>
              handleDelete(
                info.row.original.buildingIndex,
                info.row.original.floorIndex
              )
            }
          />
        ),
        header: 'Action',
        enableSorting: false,
      }),
    ],
    [flattenedFloors]
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
        display={activeStep === 3 ? 'flex' : 'none'}
      >
        <DataTable
          columns={columns}
          data={flattenedFloors ?? []}
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
          Add New Floor
        </FormAddButton>
      </VStack>
      <Floor isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default FloorStep;
