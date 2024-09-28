import { Flex, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import AssetDetail from './AssetDetail';
import { useSearchParams } from 'next/navigation';
import { useGetAssetInfoHeaderByIdQuery } from '~/lib/redux/services/asset/general.services';
import AssetTable from './Common/AssetTable';

interface ListViewProps {
  data: Asset[];
  pageNumber?: number;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  pageSize?: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  totalPages?: number;
  isLoading: boolean;
  isFetching?: boolean;
}
const ListView = (props: ListViewProps) => {
  const {
    data,
    pageNumber,
    setPageNumber,
    totalPages,
    pageSize,
    setPageSize,
    isLoading,
    isFetching = false,
  } = props;
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchParams = useSearchParams();
  const assetId = searchParams.get('asset');
  const { data: assetData } = useGetAssetInfoHeaderByIdQuery(assetId, {
    skip: !assetId,
  });

  useEffect(() => {
    if (selectedAsset) {
      onOpen();
    }
  }, [selectedAsset]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedAsset(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (assetData?.data) {
      setSelectedAsset(assetData?.data);
    }
  }, [assetData]);

  return (
    <Flex width="full" mt="8px">
      <AssetTable
        data={data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleSelectRow={setSelectedAsset}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        showFooter={true}
        emptyLines={10}
        isSelectable={true}
      />

      {selectedAsset && (
        <AssetDetail data={selectedAsset} onClose={onClose} isOpen={isOpen} />
      )}
    </Flex>
  );
};

export default ListView;
