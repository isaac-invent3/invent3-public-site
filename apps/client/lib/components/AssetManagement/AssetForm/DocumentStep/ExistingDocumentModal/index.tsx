import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';

import {
  useGetAllAssetDocumentsQuery,
  useSearchAssetDocumentsMutation,
} from '~/lib/redux/services/asset/document.services';
import { createColumnHelper } from '@tanstack/react-table';
import {
  AssetDocument,
  AssetFormDocument,
} from '~/lib/interfaces/asset/general.interface';
import { dateFormatter } from '~/lib/utils/Formatters';
import { Button, DataTable } from '@repo/ui/components';
import { getDocumentInfo } from '~/lib/utils/helperFunctions';
import { useField } from 'formik';
import { ListResponse } from '@repo/interfaces';

interface ExistingDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleNewExistingDocumentsIds: (ids: number[]) => void;
}
const ExistingDocumentModal = (props: ExistingDocumentModalProps) => {
  const { isOpen, onClose, handleNewExistingDocumentsIds } = props;
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllAssetDocumentsQuery(
    {
      pageNumber,
      pageSize,
    },
    { skip: search !== '' || !isOpen }
  );
  const [searchAssetDocument, { isLoading: searchLoading }] =
    useSearchAssetDocumentsMutation({});
  const [searchData, setSearchData] =
    useState<ListResponse<AssetDocument> | null>(null);
  const { handleSubmit } = useCustomMutation();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('documents');

  const searchCriterion = {
    criterion: [
      {
        columnName: 'documentName',
        columnValue: search,
        operation: OPERATORS.Contains,
      },
    ],
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(
      searchAssetDocument,
      searchCriterion,
      ''
    );

    response?.data?.data && setSearchData(response?.data?.data);
  }, [searchAssetDocument, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  const columnHelper = createColumnHelper<AssetDocument>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('documentId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('documentName', {
          cell: (info) => info.getValue(),
          header: 'Document Name',
          enableSorting: false,
        }),
        columnHelper.accessor('base64Prefix', {
          cell: (info) => {
            const { documentId, documentName, base64Prefix } =
              info.row.original;
            const { sizeInMB } = getDocumentInfo({
              documentId,
              documentName,
              base64Prefix,
              base64Document: info.row.original.document,
            });
            return sizeInMB ? `${sizeInMB.toFixed(2)}MB` : 'N/A';
          },
          header: 'File Size',
          enableSorting: false,
        }),
        columnHelper.accessor('createdBy', {
          cell: (info) => info.getValue(),
          header: 'Created By',
          enableSorting: false,
        }),
        columnHelper.accessor('createdDate', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Date Created',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  const handleAddDocuments = () => {
    const selectedDocuments: AssetFormDocument[] = [];
    const sourceItems =
      search && searchData ? searchData.items : (data?.data?.items ?? []);
    selectedRows.forEach((row) => {
      const document = sourceItems.find((_, index) => index === row);
      if (document) {
        selectedDocuments.push({
          documentId: document.documentId,
          documentName: document.documentName,
          base64Document: document.document,
          base64Prefix: document.base64Prefix,
        });
      }
    });
    //Filter out documents already existing
    const newDocuments = selectedDocuments.filter(
      (item) =>
        !meta.value
          ?.map((item: AssetDocument) => item.documentId)
          .includes(item.documentId)
    );

    helpers.setValue([...meta.value, ...newDocuments]);

    handleNewExistingDocumentsIds(
      newDocuments.map((item) => item.documentId as number)
    );

    onClose();
  };

  return (
    <GenericTemplateModal
      isOpen={isOpen}
      onClose={onClose}
      headerName={'Asset Documents'}
      pageSize={pageSize}
      pageNumber={pageNumber}
      totalPages={
        search && searchData
          ? searchData.totalPages
          : (data?.data?.totalPages ?? 0)
      }
      showDetails={showDetails}
      setShowDetails={setShowDetails}
      setSearch={setSearch}
      setPageNumber={setPageNumber}
      setPageSize={setPageSize}
      footer={
        <Button
          customStyles={{ width: 'max-content', mt: '20px' }}
          isDisabled={selectedRows.length === 0}
          handleClick={handleAddDocuments}
        >
          Add Document{selectedRows.length > 1 ? 's' : ''}
        </Button>
      }
    >
      <DataTable
        columns={columns}
        data={
          search && searchData
            ? searchData.items.filter((item) => item.document !== null)
            : (data?.data?.items.filter((item) => item.document !== null) ?? [])
        }
        showFooter={true}
        emptyLines={3}
        isLoading={isLoading}
        isSelectable
        isFetching={isFetching || searchLoading}
        selectMultipleRows={true}
        selectedRows={selectedRows}
        setSelectedRows={(items) => setSelectedRows(items)}
        maxTdWidth="250px"
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '17px',
          paddingBottom: '17px',
          fontWeight: 700,
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '16px',
          paddingBottom: '16px',
        }}
        customTBodyRowStyle={{ verticalAlign: 'top' }}
        customTableContainerStyle={{ rounded: 'none' }}
      />
    </GenericTemplateModal>
  );
};

export default ExistingDocumentModal;
