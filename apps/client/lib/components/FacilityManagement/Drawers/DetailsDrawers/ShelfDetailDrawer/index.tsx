import {
  DrawerBody,
  DrawerHeader,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { DataTable, GenericDrawer, GenericPopover } from '@repo/ui/components';
import { Aisle, Shelf } from '~/lib/interfaces/location.interfaces';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useGetShelvesByAisleIdQuery } from '~/lib/redux/services/location/shelf.services';
import HeaderActionButtons from '../HeaderActionButtons';
import InfoCard from '../InfoCard';
import PopoverAction from './PopoverAction';
import ShelfModal from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/ShelfModal';

interface ShelfDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  aisleData: Aisle;
}

const ShelfDetailDrawer = (props: ShelfDetailDrawerProps) => {
  const { aisleData, isOpen, onClose } = props;
  const { data, isLoading, isFetching } = useGetShelvesByAisleIdQuery(
    { id: aisleData.aisleId },
    {
      skip: !aisleData.aisleId,
    }
  );
  const {
    isOpen: isOpenCreateModal,
    onClose: onCloseCreateModal,
    onOpen: onOpenCreateModal,
  } = useDisclosure();

  const columnHelper = createColumnHelper<Shelf>();

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('shelfRef', {
          cell: (info) => info.getValue(),
          header: 'Shelf Ref',
          enableSorting: false,
        }),
        columnHelper.accessor('shelfName', {
          cell: (info) => info.getValue(),
          header: 'Shelf Name',
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
            suffix="Shelf"
            handleButtonClick={onOpenCreateModal}
          />
        </DrawerHeader>
        <DrawerBody p={0}>
          <VStack spacing="24px">
            <InfoCard
              title={`${aisleData?.aisleName} (Aisle)`}
              count={aisleData?.totalShelvesInAisle}
              locationTitle="Shelves"
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
            />
          </VStack>
        </DrawerBody>
      </GenericDrawer>
      <ShelfModal
        isOpen={isOpenCreateModal}
        onClose={onCloseCreateModal}
        defaultAisleId={aisleData.aisleId}
        showDropdown={false}
        showToast
      />
    </>
  );
};

export default ShelfDetailDrawer;
