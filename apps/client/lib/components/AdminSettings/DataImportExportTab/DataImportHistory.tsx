import { Box, HStack, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import { DataTable, FormInputWrapper } from '@repo/ui/components';
import React, { useMemo, useState } from 'react';
import DetailHeader from '../../UI/DetailHeader';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '~/lib/utils/Formatters';
import { useGetDataImportHistoryQuery } from '~/lib/redux/services/dataUpload.services';
import { ImportHistory } from '~/lib/interfaces/dataUpload.interfaces';
import { DATA_UPLOAD_STATUS, DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { CloseIcon } from '../../CustomIcons';
import DataImportErrorModal from './DataImportErrorModal';
import { CheckIcon } from '@chakra-ui/icons';

const ImportStatus = ({ data }: { data: ImportHistory }) => {
  return (
    <Box>
      {data?.stageStatusId === DATA_UPLOAD_STATUS.Completed && (
        <HStack>
          <CheckIcon color="#00A129" />
          <Text as="span" color="neutral.700">
            Completed
          </Text>
        </HStack>
      )}
      {data?.stageStatusId &&
        [DATA_UPLOAD_STATUS.Done, DATA_UPLOAD_STATUS.Failed].includes(
          data?.stageStatusId
        ) && (
          <HStack display="flex">
            <CloseIcon boxSize="16px" color="error.500" />
            <Text as="span" color="neutral.700">
              Failed
            </Text>
          </HStack>
        )}
    </Box>
  );
};

const Action = ({ data }: { data: ImportHistory }) => {
  const [showPhase2Error, setShowPhase2Error] = useState(false);
  return (
    <>
      {data?.stageStatusId &&
      [DATA_UPLOAD_STATUS.Done, DATA_UPLOAD_STATUS.Failed].includes(
        data?.stageStatusId
      ) ? (
        <Text
          as="span"
          color="#0366EF"
          cursor="pointer"
          onClick={() => setShowPhase2Error(true)}
        >
          View Errors
        </Text>
      ) : (
        <>N/A</>
      )}
      <DataImportErrorModal
        dataUploadId={data?.dataUploadId}
        isOpen={showPhase2Error}
        onClose={() => setShowPhase2Error(false)}
      />
    </>
  );
};
export const DataImportHistory = () => {
  const columnHelper = createColumnHelper<ImportHistory>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetDataImportHistoryQuery({
    pageNumber,
    pageSize,
  });

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-DD-MM hh:mmA'),
          header: 'Date',
          enableSorting: false,
        }),
        columnHelper.accessor('uploadedByFullName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Uploaded By',
          enableSorting: false,
        }),
        columnHelper.accessor('fileName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'File Name',
          enableSorting: false,
        }),
        columnHelper.accessor('stageId', {
          id: 'action',
          cell: (info) => <Action data={info.row.original} />,
          header: 'Action',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'DD MMM YYYY, HH:mm'),
          header: 'Date',
          enableSorting: false,
        }),
        columnHelper.accessor('uploadedByFullName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Uploaded By',
          enableSorting: false,
        }),
        columnHelper.accessor('fileName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'File Name',
          enableSorting: false,
        }),
        columnHelper.accessor('stageId', {
          cell: (info) => <ImportStatus data={info.row.original} />,
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('totalRecordCount', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Records Imported',
          enableSorting: false,
        }),
        columnHelper.accessor('erorrs', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Errors',
          enableSorting: false,
        }),
        columnHelper.accessor('failedItemsHistoryId', {
          cell: (info) => <Action data={info.row.original} />,
          header: 'Action',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );

  return (
    <VStack width="full" spacing={{ base: '16px', lg: '32px' }}>
      <DetailHeader
        variant="primary"
        customStyles={{ size: 'lg', mt: { base: '16px', lg: '0px' } }}
      >
        3. Data Import History
      </DetailHeader>{' '}
      <FormInputWrapper
        sectionMaxWidth="157px"
        customSpacing="64px"
        description="Track and review details of all past data imports."
        title="Data Import History"
        isRequired={false}
      >
        <VStack w="full" maxW="878px">
          <DataTable
            columns={isMobile ? mobileColumns : columns}
            data={data?.data?.items ?? []}
            showFooter={data?.data ? data?.data?.totalPages > 1 : false}
            isLoading={isLoading}
            isFetching={isFetching}
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
              bgColor: '#B4BFCA',
            }}
            customTdStyle={{
              paddingLeft: '16px',
              paddingTop: '16px',
              paddingBottom: '16px',
            }}
            customTBodyRowStyle={{ verticalAlign: 'top' }}
            customTableContainerStyle={{
              rounded: '4px',
            }}
          />
        </VStack>
      </FormInputWrapper>
    </VStack>
  );
};
