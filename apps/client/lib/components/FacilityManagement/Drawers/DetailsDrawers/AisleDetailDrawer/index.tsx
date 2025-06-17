import {
  DrawerBody,
  DrawerHeader,
  Heading,
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
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface AisleDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  roomData: Room;
  departmentName: string;
}

const AisleDetailDrawer = (props: AisleDetailDrawerProps) => {
  const { roomData, isOpen, onClose, departmentName } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAislesByRoomIdQuery(
    { id: roomData.roomId, pageNumber, pageSize },
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
          <VStack spacing="24px" alignItems="flex-start">
            <Heading
              fontSize={{ base: '16px', lg: '24px' }}
              px={{ base: '16px', lg: '32px' }}
              lineHeight="100%"
              fontWeight={800}
              color="neutral.800"
            >
              Room Details
            </Heading>
            <InfoCard
              title={`${roomData?.roomName}`}
              dividerText="In"
              subtitle={departmentName}
              count={roomData?.totalAislesInRoom}
              locationTitle="Aisles"
            />
            <DataTable
              columns={columns}
              isLoading={isLoading || isFetching}
              data={data?.data?.items ?? []}
              showFooter={
                data?.data?.hasNextPage || data?.data?.hasPreviousPage
              }
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              pageSize={pageSize}
              setPageSize={setPageSize}
              customThStyle={{ paddingLeft: { base: '16px', lg: '32px' } }}
              customTdStyle={{
                paddingLeft: { base: '16px', lg: '32px' },
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
          roomName={roomData?.roomName}
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
