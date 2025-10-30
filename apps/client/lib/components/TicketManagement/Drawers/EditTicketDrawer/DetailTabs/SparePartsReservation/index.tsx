import { HStack, Icon, useDisclosure, VStack } from '@chakra-ui/react';
import { Button, DataTable, FormAddButton } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import AssetListModal from '~/lib/components/AssetManagement/AssetCount/AssetListModal';
import { DeleteIcon } from '~/lib/components/CustomIcons';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const SuggestedSpartParts = () => {
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const columnHelper = createColumnHelper<Asset>();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const columns = useMemo(() => {
    const baseColumns = [
      columnHelper.accessor('assetName', {
        cell: (info) => info.getValue(),
        header: 'Part Name',
        enableSorting: false,
      }),
      columnHelper.accessor('assetCode', {
        cell: (info) => info.getValue(),
        header: 'Part Code',
        enableSorting: false,
      }),
      columnHelper.accessor('assetCategory', {
        cell: (info) => info.getValue(),
        header: 'Category',
        enableSorting: false,
      }),
      columnHelper.accessor('aisleId', {
        cell: (info) => info.getValue(),
        header: 'Availability',
        enableSorting: false,
      }),
      columnHelper.accessor('assetLocation', {
        cell: (info) => info.getValue(),
        header: 'Warehouse Location',
        enableSorting: false,
      }),
      columnHelper.display({
        cell: (info) => (
          <Icon
            as={DeleteIcon}
            boxSize="16px"
            cursor="pointer"
            onClick={() =>
              setSelectedAssets((prev) =>
                prev.filter(
                  (item) => item.assetId !== info.row.original.assetId
                )
              )
            }
          />
        ),
        header: 'Action',
      }),
    ];

    return baseColumns;
  }, [selectedAssets]); //eslint-disable-line

  return (
    <>
      <VStack width="full" height="full" spacing="71px">
        <VStack width="full" spacing={4} alignItems="flex-end">
          <FormAddButton handleClick={onOpen}>Make Reservation</FormAddButton>
          <DataTable
            columns={columns}
            data={selectedAssets ?? []}
            showFooter={false}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
            emptyLines={3}
            maxTdWidth="250px"
            customThStyle={{
              paddingLeft: '16px',
              paddingTop: '17px',
              paddingBottom: '17px',
              fontWeight: 700,
              bgColor: '#B4BFCA80',
              rounded: 'none',
            }}
            customTdStyle={{
              paddingLeft: '16px',
              paddingTop: '16px',
              paddingBottom: '16px',
            }}
            customTBodyRowStyle={{ verticalAlign: 'top' }}
            customTableContainerStyle={{
              rounded: '0px',
            }}
          />
        </VStack>
        {selectedAssets.length > 0 && (
          <HStack spacing={2} width="full" justifyContent="flex-end">
            <Button
              customStyles={{ width: 'max-content', height: '35px' }}
              variant="secondary"
              handleClick={() => {}}
            >
              Release Reservation
            </Button>
            <Button
              customStyles={{ width: 'max-content', height: '35px' }}
              handleClick={() => {}}
            >
              Confirm Reservation
            </Button>
          </HStack>
        )}
      </VStack>
      <AssetListModal
        name="Select Asset For Reservation"
        subheading="Select Asset For Reservations"
        isSelectable={true}
        isOpen={isOpen}
        onClose={onClose}
        handleAssets={(assets) => setSelectedAssets(assets)}
        renderFooter={(handleReserve, handleCancel) => (
          <HStack spacing={2}>
            <Button
              customStyles={{ width: '127px', height: '35px' }}
              variant="secondary"
              handleClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              customStyles={{ width: '211px', height: '35px' }}
              handleClick={handleReserve}
            >
              Reserve Selected Assets
            </Button>
          </HStack>
        )}
      />
    </>
  );
};

export default SuggestedSpartParts;
