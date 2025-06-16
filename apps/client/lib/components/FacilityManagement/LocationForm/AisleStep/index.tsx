import { useDisclosure, VStack } from '@chakra-ui/react';
import { DataTable, FormAddButton } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import { LocationMasterFormInterface } from '~/lib/interfaces/location.interfaces';
import PopoverAction from '../PopoverAction';
import RoomModal from '../../LocationModals/RoomModal';
import AisleModal from '../../LocationModals/AisleModal';

interface AisleStepProps {
  activeStep: number;
}
const AisleStep = (props: AisleStepProps) => {
  const { activeStep } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { values, setFieldValue } =
    useFormikContext<LocationMasterFormInterface>();

  const flattenedAisles = useMemo(() => {
    return (
      values?.createBuildingDtos?.flatMap((building, buildingIdx) => {
        const floors = building?.createFloorDtos ?? [];
        return floors.flatMap((floor, floorIdx) => {
          const departments = floor?.createDepartmentDtos ?? [];
          return departments.flatMap((department, departmentIdx) => {
            const rooms = department?.createRoomDtos ?? [];
            return rooms.flatMap((room, roomIdx) => {
              const aisles = room?.createAisleDtos ?? [];
              return aisles.map((aisle, aisleIdx) => ({
                buildingName: building.createBuildingDto.buildingName,
                floorName: floor.createFloorDto.floorName,
                departmentName: department.createDepartmentDto.departmentName,
                roomName: room.createRoomDto.roomName,
                aisleName: aisle.createAisleDto.aisleName,
                aisleRef: aisle.createAisleDto.aisleRef,
                buildingIndex: buildingIdx,
                floorIndex: floorIdx,
                departmentIndex: departmentIdx,
                roomIndex: roomIdx,
                aisleIndex: aisleIdx,
              }));
            });
          });
        });
      }) ?? []
    );
  }, [values?.createBuildingDtos]);

  const handleDelete = (
    buildingIndex: number,
    floorIndex: number,
    departmentIndex: number,
    roomIndex: number,
    aisleIndex: number
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
        Array.isArray(updatedFloors[floorIndex].createDepartmentDtos)
      ) {
        const updatedDepartments = [
          ...updatedFloors[floorIndex].createDepartmentDtos,
        ];
        if (
          updatedDepartments[departmentIndex] &&
          Array.isArray(updatedDepartments[departmentIndex].createRoomDtos)
        ) {
          const updatedRooms = [
            ...updatedDepartments[departmentIndex].createRoomDtos,
          ];
          if (
            updatedRooms[roomIndex] &&
            Array.isArray(updatedRooms[roomIndex].createAisleDtos)
          ) {
            const updatedAisles = [...updatedRooms[roomIndex].createAisleDtos];
            updatedAisles.splice(aisleIndex, 1);
            updatedRooms[roomIndex] = {
              ...updatedRooms[roomIndex],
              createAisleDtos: updatedAisles,
            };
            updatedDepartments[departmentIndex] = {
              ...updatedDepartments[departmentIndex],
              createRoomDtos: updatedRooms,
            };
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
    }
  };

  const columnHelper = createColumnHelper<{
    buildingIndex: number;
    floorIndex: number;
    departmentIndex: number;
    roomIndex: number;
    aisleIndex: number;
    buildingName: string;
    floorName: string;
    departmentName: string;
    roomName: string;
    aisleRef: string | null;
    aisleName: string;
  }>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('aisleRef', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Aisle Ref',
        enableSorting: false,
      }),
      columnHelper.accessor('aisleName', {
        cell: (info) => info.getValue(),
        header: 'Aisle Name',
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
      columnHelper.accessor('departmentName', {
        cell: (info) => info.getValue(),
        header: 'Department Name',
        enableSorting: false,
      }),
      columnHelper.accessor('roomName', {
        cell: (info) => info.getValue(),
        header: 'Room Name',
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
                info.row.original.departmentIndex,
                info.row.original.roomIndex,
                info.row.original.aisleIndex
              )
            }
          />
        ),
        header: 'Action',
        enableSorting: false,
      }),
    ],
    [flattenedAisles]
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
        display={activeStep === 6 ? 'flex' : 'none'}
      >
        <DataTable
          columns={columns}
          data={flattenedAisles ?? []}
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
          Add New Aisle
        </FormAddButton>
      </VStack>
      <AisleModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AisleStep;
