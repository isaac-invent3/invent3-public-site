import { HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { ListResponse } from '@repo/interfaces';
import { DataTable, FilterButton } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { getSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import SaveAsTemplateModal, {
  SaveAsTemplatePayload,
} from '~/lib/components/Common/Modals/SaveAsTemplateModal';
import { CalendarIcon } from '~/lib/components/CustomIcons';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  GenerateReportDetails,
  GenerateReportResponse,
  Report,
  SaveReportPayload,
} from '~/lib/interfaces/report.interfaces';
import { useSaveReportAsTemplateMutation } from '~/lib/redux/services/reports.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import ScheduleReportDrawer from '../../Drawers/ScheduleReportDrawer';
import SaveReportTemplateSuccessModal from '../../Modals/SaveReportTemplateSuccessModal';
import ShareReportPopover from '../../ReportView/ShareReportPopover';

interface GeneratedReportProps {
  response: ListResponse<GenerateReportResponse>;
  generatePayload: GenerateReportDetails;
}

const GeneratedReport = (props: GeneratedReportProps) => {
  const { response, generatePayload } = props;

  const columnHelper = createColumnHelper<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [savedReport, setSavedReport] = useState<Report | null>(null);

  const { handleSubmit } = useCustomMutation();
  const [saveReport, { isLoading: isSavingReport }] =
    useSaveReportAsTemplateMutation({});

  const generateDynamicColumns = (data: GenerateReportResponse[]) => {
    if (!data || data.length === 0) return [];

    // Get keys from the first record to generate columns dynamically
    const dynamicKeys = Object.keys(data[0]?.model || {});

    return dynamicKeys.map((key) => {
      return columnHelper.accessor(key, {
        cell: (info) => info.row.original.model[key],
        header: key.replace(/([A-Z])/g, ' $1').toUpperCase(), // Format key to readable header
        enableSorting: false,
      });
    });
  };

  const columns = useMemo(
    () => {
      const dynamicColumns = generateDynamicColumns(response.items || []);

      return dynamicColumns;
    },
    [[response.items]] //eslint-disable-line
  );

  const {
    isOpen: isOpenSchedule,
    onOpen: onOpenSchedule,
    onClose: onCloseSchedule,
  } = useDisclosure();

  const {
    isOpen: isOpenSaveAsTemplate,
    onOpen: onOpenSaveAsTemplate,
    onClose: onCloseSaveAsTemplate,
  } = useDisclosure();

  const {
    isOpen: isOpenSaveAsTemplateSuccess,
    onOpen: onOpenSaveAsTemplateSuccess,
    onClose: onCloseSaveAsTemplateSuccess,
  } = useDisclosure();

  const handleSaveReport = async (data: SaveAsTemplatePayload) => {
    const session = await getSession();

    if (!session) {
      return;
    }

    const payload: SaveReportPayload = {
      reportName: data.templateName,
      description: data.templateDescription,
      createdBy: session?.user.username!,
      isDefaultReport: data.isDefaultReport,
      systemContextTypeId: generatePayload.systemContextTypeId!,
      executedSearchRequest: {
        criterion: generatePayload.criterion ?? [],
      },
    };

    const response = await handleSubmit(saveReport, payload, '');

    if (response?.data) {
      setSavedReport(response.data.data);
      onOpenSaveAsTemplateSuccess();
    }
  };

  return (
    <VStack mt={6}>
      <HStack spacing="16px" alignSelf="flex-end">
        <FilterButton
          chevron={false}
          icon={CalendarIcon}
          label="Schedule Report"
          handleClick={() => savedReport && onOpenSchedule()}
          isActive={false}
          border="1px solid #D4D4D4"
          opacity={!savedReport ? 0.4 : 1}
          cursor={!savedReport ? 'auto' : 'pointer'}
        />
        <FilterButton
          chevron={false}
          icon={CalendarIcon}
          label="Save as Template"
          handleClick={() => onOpenSaveAsTemplate()}
          isActive={false}
          border="1px solid #D4D4D4"
        />

        <ShareReportPopover report={[]} />
      </HStack>

      <DataTable
        columns={columns}
        data={response.items ?? []}
        totalPages={response.totalPages}
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        emptyLines={5}
        isSelectable
        maxTdWidth="200px"
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
          fontWeight: 700,
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
        customTableContainerStyle={{ rounded: 'none' }}
      />

      <ScheduleReportDrawer
        isOpen={isOpenSchedule}
        onClose={onCloseSchedule}
        reportId={savedReport?.reportId!}
      />

      <SaveAsTemplateModal
        isOpen={isOpenSaveAsTemplate}
        onClose={onCloseSaveAsTemplate}
        handleSave={handleSaveReport}
        isLoading={isSavingReport}
      />

      <SaveReportTemplateSuccessModal
        templateName={savedReport?.reportName ?? ''}
        isOpen={isOpenSaveAsTemplateSuccess}
        onClose={() => {
          onCloseSaveAsTemplate();
          onCloseSaveAsTemplateSuccess();
        }}
      />
    </VStack>
  );
};

export default GeneratedReport;
