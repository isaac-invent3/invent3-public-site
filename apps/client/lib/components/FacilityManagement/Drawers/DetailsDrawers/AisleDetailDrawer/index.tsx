import {
  DrawerBody,
  DrawerHeader,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { DataTable, GenericDrawer } from '@repo/ui/components';
import HeaderActionButtons from '../HeaderActionButtons';
import { Aisle, Room } from '~/lib/interfaces/location.interfaces';
import InfoCard from '../InfoCard';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useGetAislesByRoomIdQuery } from '~/lib/redux/services/location/aisle.services';
import ShelfDetailDrawer from '../ShelfDetailDrawer';
import PopoverAction from './PopoverAction';
import AisleModal from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/AisleModal';

interface AisleDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  roomData: Room;
}

const AisleDetailDrawer = (props: AisleDetailDrawerProps) => {
  const { roomData, isOpen, onClose } = props;
  const { data, isLoading, isFetching } = useGetAislesByRoomIdQuery(
    { id: roomData.roomId },
    {
      skip: !roomData.roomId,
    }
  );
  const [selectedAisle, setSelectedAisle] = useState<Aisle | null>(null);
  const {
    isOpen: isOpenShelfDetail,
    onClose: onCloseShelfDetail,
    onOpen: onOpenShelfDetail,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateModal,
    onClose: onCloseCreateModal,
    onOpen: onOpenCreateModal,
  } = useDisclosure();

  const columnHelper = createColumnHelper<Aisle>();

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('aisleRef', {
          cell: (info) => info.getValue(),
          header: 'Aisle Ref',
          enableSorting: false,
        }),
        columnHelper.accessor('aisleName', {
          cell: (info) => info.getValue(),
          header: 'Aisle Name',
          enableSorting: false,
        }),
        columnHelper.accessor('roomId', {
          cell: (info) => info.getValue(),
          header: 'Number of Shelf',
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
            suffix="Aisle"
            handleButtonClick={onOpenCreateModal}
          />
        </DrawerHeader>
        <DrawerBody p={0}>
          <VStack spacing="24px">
            <InfoCard
              title={`${roomData?.roomName} (Room)`}
              count={roomData?.totalAislesInRoom}
              locationTitle="Aisles"
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
                setSelectedAisle(row);
                onOpenShelfDetail();
              }}
            />
          </VStack>
        </DrawerBody>
      </GenericDrawer>
      {selectedAisle && (
        <ShelfDetailDrawer
          onClose={onCloseShelfDetail}
          isOpen={isOpenShelfDetail}
          aisleData={selectedAisle}
        />
      )}
      <AisleModal
        isOpen={isOpenCreateModal}
        onClose={onCloseCreateModal}
        defaultRoomId={roomData.roomId}
        showDropdown={false}
        showToast
      />
    </>
  );
};

export default AisleDetailDrawer;
