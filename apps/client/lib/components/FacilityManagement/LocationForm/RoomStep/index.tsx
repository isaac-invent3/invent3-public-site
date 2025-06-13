import { useDisclosure, VStack } from '@chakra-ui/react';
import { DataTable, FormAddButton } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import { LocationMasterFormInterface } from '~/lib/interfaces/location.interfaces';
import PopoverAction from '../PopoverAction';
import RoomModal from '../../LocationModals/RoomModal';

interface RoomStepProps {
  activeStep: number;
}
const RoomStep = (props: RoomStepProps) => {
  const { activeStep } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { values } = useFormikContext<LocationMasterFormInterface>();

  const flattenedRoom = useMemo(() => {
    return (
      values?.createBuildingDtos?.flatMap((building, buildingIdx) => {
        const floors = building?.createFloorDtos ?? [];
        return floors.flatMap((floor, floorIdx) => {
          const departments = floor?.createDepartmentDtos ?? [];
          return departments.flatMap((department, departmentIdx) => {
            const rooms = department?.createRoomDtos ?? [];
            return rooms.map((room) => ({
              buildingName: building.createBuildingDto.buildingName,
              floorName: floor.createFloorDto.floorName,
              departmentName: department.createDepartmentDto.departmentName,
              departmentRef: department.createDepartmentDto.departmentRef,
              roomName: room.createRoomDto.roomName,
              roomRef: room.createRoomDto.roomRef,
              buildingId: buildingIdx,
              floorId: floorIdx,
              departmentId: departmentIdx,
            }));
          });
        });
      }) ?? []
    );
  }, [values?.createBuildingDtos]);

  const columnHelper = createColumnHelper<{
    buildingId: number;
    floorId: number;
    departmentId: number;
    buildingName: string;
    floorName: string;
    departmentName: string;
    roomRef: string | null;
    roomName: string;
  }>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('roomRef', {
        cell: (info) => info.getValue(),
        header: 'Room Ref',
        enableSorting: false,
      }),
      columnHelper.accessor('roomName', {
        cell: (info) => info.getValue(),
        header: 'Room Name',
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
        display={activeStep === 5 ? 'flex' : 'none'}
      >
        <DataTable
          columns={columns}
          data={flattenedRoom ?? []}
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
          Add New Room
        </FormAddButton>
      </VStack>
      <RoomModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default RoomStep;
