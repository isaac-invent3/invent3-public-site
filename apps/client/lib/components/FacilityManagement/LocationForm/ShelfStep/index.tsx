import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { DataTable, FormAddButton } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import { LocationMasterFormInterface } from '~/lib/interfaces/location.interfaces';
import PopoverAction from '../PopoverAction';
import ShelfModal from '../../LocationModals/ShelfModal';

interface ShelfStepProps {
  activeStep: number;
}
const ShelfStep = (props: ShelfStepProps) => {
  const { activeStep } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { values, setValues } = useFormikContext<LocationMasterFormInterface>();

  const flattenedShelves = useMemo(() => {
    return (
      values?.createBuildingDtos?.flatMap((building, buildingIdx) => {
        const floors = building?.createFloorDtos ?? [];
        return floors.flatMap((floor, floorIdx) => {
          const departments = floor?.createDepartmentDtos ?? [];
          return departments.flatMap((department, departmentIdx) => {
            const rooms = department?.createRoomDtos ?? [];
            return rooms.flatMap((room, roomIdx) => {
              const aisles = room?.createAisleDtos ?? [];
              return aisles.flatMap((aisle, aisleIdx) => {
                const shelves = aisle?.createShelveDtos ?? [];
                return shelves.map((shelf, shelfIdx) => ({
                  buildingName: building.createBuildingDto.buildingName,
                  floorName: floor.createFloorDto.floorName,
                  departmentName: department.createDepartmentDto.departmentName,
                  roomName: room.createRoomDto.roomName,
                  aisleName: aisle.createAisleDto.aisleName,
                  shelfName: shelf.createShelfDto.shelfName,
                  shelfRef: shelf.createShelfDto.shelfRef,
                  buildingId: buildingIdx,
                  floorId: floorIdx,
                  departmentId: departmentIdx,
                  roomId: roomIdx,
                  aisleId: aisleIdx,
                  shelfId: shelfIdx,
                }));
              });
            });
          });
        });
      }) ?? []
    );
  }, [values?.createBuildingDtos]);

  const columnHelper = createColumnHelper<{
    buildingId: number;
    floorId: number;
    departmentId: number;
    roomId: number;
    aisleId: number;
    shelfId: number;
    buildingName: string;
    floorName: string;
    departmentName: string;
    roomName: string;
    aisleName: string;
    shelfRef: string | null;
    shelfName: string;
  }>();

  const handleDeleteShelf = (
    buildingId: number,
    floorId: number,
    departmentId: number,
    roomId: number,
    aisleId: number,
    shelfId: number
  ) => {
    // Deep clone values to avoid mutating Formik state directly
    const newValues = JSON.parse(JSON.stringify(values));
    const shelves =
      newValues.createBuildingDtos?.[buildingId]?.createFloorDtos?.[floorId]
        ?.createDepartmentDtos?.[departmentId]?.createRoomDtos?.[roomId]
        ?.createAisleDtos?.[aisleId]?.createShelveDtos;
    if (shelves && shelfId > -1 && shelfId < shelves.length) {
      shelves.splice(shelfId, 1);
    }
    setValues(newValues);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('shelfRef', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Shelf Ref',
        enableSorting: false,
      }),
      columnHelper.accessor('shelfName', {
        cell: (info) => info.getValue(),
        header: 'Shelf Name',
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
      columnHelper.accessor('aisleName', {
        cell: (info) => info.getValue(),
        header: 'Aisle Name',
        enableSorting: false,
      }),
      columnHelper.display({
        id: 'action',
        cell: (info) => {
          const row = info.row.original;
          return (
            <Text
              color="red.500"
              cursor="pointer"
              onClick={() =>
                handleDeleteShelf(
                  row.buildingId,
                  row.floorId,
                  row.departmentId,
                  row.roomId,
                  row.aisleId,
                  row.shelfId
                )
              }
            >
              Delete
            </Text>
          );
        },
        header: 'Action',
        enableSorting: false,
      }),
    ],
    [columnHelper, values]
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
        display={activeStep === 7 ? 'flex' : 'none'}
      >
        <DataTable
          columns={columns}
          data={flattenedShelves ?? []}
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
          Add New Shelf
        </FormAddButton>
      </VStack>
      <ShelfModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ShelfStep;
