import {
  DrawerBody,
  DrawerHeader,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { DataTable, GenericDrawer } from '@repo/ui/components';
import { Department, Room } from '~/lib/interfaces/location.interfaces';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useGetRoomsByDepartmentIdQuery } from '~/lib/redux/services/location/room.services';
import PopoverAction from './PopoverAction';
import HeaderActionButtons from '../HeaderActionButtons';
import InfoCard from '../InfoCard';
import AisleDetailDrawer from '../AisleDetailDrawer';
import RoomModal from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/RoomModal';

interface RoomDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  departmentData: Department;
}

const RoomDetailDrawer = (props: RoomDetailDrawerProps) => {
  const { departmentData, isOpen, onClose } = props;
  const { data, isLoading, isFetching } = useGetRoomsByDepartmentIdQuery(
    { id: departmentData.departmentId },
    {
      skip: !departmentData.departmentId,
    }
  );
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const {
    isOpen: isOpenAisleDetail,
    onClose: onCloseAisleDetail,
    onOpen: onOpenAisleDetail,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateModal,
    onClose: onCloseCreateModal,
    onOpen: onOpenCreateModal,
  } = useDisclosure();

  const columnHelper = createColumnHelper<Room>();

  const columns = useMemo(
    () => {
      const baseColumns = [
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
        columnHelper.accessor('roomId', {
          cell: (info) => info.getValue(),
          header: 'Number of Aisles',
          enableSorting: false,
        }),
        columnHelper.display({
          id: 'action',
          cell: (info) => <PopoverAction data={info.row.original} />,
          header: 'Action',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data?.data?.items]] //eslint-disable-line
  );

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="597px">
        <DrawerHeader p={0} m={0}>
          <HeaderActionButtons
            closeDrawer={onClose}
            suffix="Room"
            handleButtonClick={onOpenCreateModal}
          />
        </DrawerHeader>
        <DrawerBody p={0}>
          <VStack spacing="24px">
            <InfoCard
              title={`${departmentData?.departmentName} (Department)`}
              count={departmentData?.totalRoomsInDepartmentFloor}
              locationTitle="Rooms"
            />
            <DataTable
              columns={columns}
              isLoading={isLoading || isFetching}
              data={data?.data?.items ?? []}
              showFooter={false}
              customTdStyle={{
                paddingLeft: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                bgColor: '#f2f1f1',
              }}
              handleSelectRow={(row) => {
                setSelectedRoom(row);
                onOpenAisleDetail();
              }}
            />
          </VStack>
        </DrawerBody>
      </GenericDrawer>
      {selectedRoom && (
        <AisleDetailDrawer
          onClose={onCloseAisleDetail}
          isOpen={isOpenAisleDetail}
          roomData={selectedRoom}
        />
      )}
      <RoomModal
        isOpen={isOpenCreateModal}
        onClose={onCloseCreateModal}
        defaultDepartmentId={departmentData.departmentId}
        showDropdown={false}
        showToast
      />
    </>
  );
};

export default RoomDetailDrawer;
