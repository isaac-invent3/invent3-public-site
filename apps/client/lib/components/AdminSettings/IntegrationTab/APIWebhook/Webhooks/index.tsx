import { Flex, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { Button, DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import SectionWrapper from '~/lib/components/UserSettings/Common/SectionWrapper';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import PopoverAction from './PopoverAction';
import { CompanyWebhookURL } from '~/lib/interfaces/webhook.interfaces';
import { useGetAllCompanyWebhookUrlsQuery } from '~/lib/redux/services/webhook.services';
import WebhookModal from './WebhookModal';

const Webhooks = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const columnHelper = createColumnHelper<CompanyWebhookURL>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllCompanyWebhookUrlsQuery({
    pageNumber,
    pageSize,
  });

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('webhookUrlName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Webhook Name',
          enableSorting: false,
        }),
        columnHelper.accessor('statusName', {
          cell: (info) => (
            <GenericStatusBox
              text={info.getValue()}
              colorCode={info.row.original.displayColorCode}
            />
          ),
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('companyWebhookUrlId', {
          cell: (info) => <PopoverAction data={info.row.original} />,
          header: '',
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
        columnHelper.accessor('webhookUrlName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Webhook Name',
          enableSorting: false,
        }),
        columnHelper.accessor('url', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Webhook URL',
          enableSorting: false,
        }),
        columnHelper.accessor('authMethodName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Authentication Method',
          enableSorting: false,
        }),
        columnHelper.accessor('secret', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Secret Key',
          enableSorting: false,
        }),
        columnHelper.accessor('statusName', {
          cell: (info) => (
            <GenericStatusBox
              text={info.getValue()}
              colorCode={info.row.original.displayColorCode}
            />
          ),
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('companyWebhookUrlId', {
          cell: (info) => <PopoverAction data={info.row.original} />,
          header: '',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );

  return (
    <>
      <SectionWrapper
        title="Webhook URL Configuration"
        subtitle="Set up automated data syncing."
        sectionInfoWidth="212px"
        sectionInfoStyle={{
          maxW: { base: '60%', md: '212px' },
        }}
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '20px', lg: '220px' }}
      >
        <Flex
          width="full"
          direction="column"
          alignItems="flex-end"
          gap="16px"
          overflow="auto"
        >
          <Button
            customStyles={{ width: 'min-content', height: '36px' }}
            handleClick={onOpen}
          >
            Create Webhook
          </Button>
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
        </Flex>
      </SectionWrapper>
      <WebhookModal isOpen={isOpen} onClose={onClose} type="create" />
    </>
  );
};

export default Webhooks;
