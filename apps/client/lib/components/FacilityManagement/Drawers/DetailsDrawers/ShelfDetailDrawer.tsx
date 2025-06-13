import { DrawerBody, DrawerHeader, VStack } from '@chakra-ui/react';

import { DataTable, GenericDrawer, GenericPopover } from '@repo/ui/components';
import HeaderActionButtons from './HeaderActionButtons';
import { Aisle, Shelf } from '~/lib/interfaces/location.interfaces';
import InfoCard from './InfoCard';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useGetShelvesByAisleIdQuery } from '~/lib/redux/services/location/shelf.services';

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
          cell: () => (
            <GenericPopover>
              <></>
            </GenericPopover>
          ),
          header: 'Action',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data?.data?.items]] //eslint-disable-line
  );

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="597px">
      <DrawerHeader p={0} m={0}>
        <HeaderActionButtons closeDrawer={onClose} />
      </DrawerHeader>
      <DrawerBody p={0}>
        <VStack spacing="24px">
          <InfoCard
            title={`${aisleData?.aisleName} (Aisle)`}
            count={5}
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
  );
};

export default ShelfDetailDrawer;
