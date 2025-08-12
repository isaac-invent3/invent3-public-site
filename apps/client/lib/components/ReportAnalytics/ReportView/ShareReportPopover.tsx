/* eslint-disable no-unused-vars */
import {
  Box,
  Flex,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { Button } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';
import { DownloadIcon } from '../../CustomIcons';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { handleExport } from '~/lib/utils/helperFunctions';
import { EXPORT_TYPE_ENUM } from '~/lib/utils/constants';
import moment from 'moment';
import { GenerateReportCriterion } from '~/lib/interfaces/report.interfaces';
import {
  useExportReportByCriterionMutation,
  useExportReportByIdMutation,
} from '~/lib/redux/services/reports.services';

type SelectedReportActions = 'download-pdf' | 'download-csv' | 'share-email';

interface PopoverActionProps {
  reportId?: number | null;
  reportCriterion?: GenerateReportCriterion[];
  systemContextTypeId?: number;
}
const ShareReportPopover = (props: PopoverActionProps) => {
  const { reportId, reportCriterion, systemContextTypeId } = props;
  const { filters } = useAppSelector((state) => state.report);
  const [exportType, setExportType] = useState<number | null>(null);
  const { handleSubmit } = useCustomMutation();
  const openModal = (action: SelectedReportActions) => {};
  const [exportReportById, { isLoading: isLoadingIdReport }] =
    useExportReportByIdMutation();
  const [exportReportByCriterion, { isLoading: isLoadingCriterionReport }] =
    useExportReportByCriterionMutation();

  const popoverRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useOutsideClick({
    ref: popoverRef,
    handler: onClose,
  });

  const submitExport = async (exportType: number) => {
    let resp;

    if (reportId) {
      resp = await handleSubmit(exportReportById, {
        reportId: reportId!,
        exportType,
        // startDate: moment(filters.fromDate, 'DD-MM-YYYY')
        //   .utc()
        //   .toISOString(),
        // endDate: moment(filters.toDate, 'DD-MM-YYYY')
        //   .utc()
        //   .toISOString(),
      });
    }
    if (reportCriterion) {
      resp = await handleSubmit(exportReportByCriterion, {
        exportType,
        reportCriterion,
        systemContextTypeId: systemContextTypeId!,
      });
    }
    if (resp?.data?.data) {
      await handleExport(resp?.data?.data);
    }
  };

  return (
    <Box ref={popoverRef}>
      <Popover
        placement={'bottom-start'}
        autoFocus={false}
        onClose={onClose}
        isOpen={isOpen}
      >
        <PopoverTrigger>
          <Flex onClick={() => onOpen()}>
            <Button
              customStyles={{
                minH: '36px',
                p: '0px',
                px: '8px',
                width: '90px',
                justifyContent: 'flex-start',
              }}
            >
              <Icon as={DownloadIcon} boxSize="24px" mr="8px" />
              Share
            </Button>
          </Flex>
        </PopoverTrigger>

        <PopoverContent
          bgColor="white"
          width="137px"
          boxShadow="0px 4px 32px 0px #00000026"
          rounded="8px"
        >
          <PopoverBody m={0} p="16px">
            <VStack width="full" alignItems="flex-start" spacing="16px">
              <Text
                cursor="pointer"
                onClick={() => {
                  setExportType(EXPORT_TYPE_ENUM.PDF);
                  submitExport(EXPORT_TYPE_ENUM.PDF);
                }}
              >
                {(isLoadingCriterionReport || isLoadingIdReport) &&
                exportType === EXPORT_TYPE_ENUM.PDF
                  ? 'Exporting...'
                  : 'Download as PDF'}
              </Text>
              <Text
                cursor="pointer"
                onClick={() => {
                  setExportType(EXPORT_TYPE_ENUM.CSV);
                  submitExport(EXPORT_TYPE_ENUM.CSV);
                }}
              >
                {(isLoadingCriterionReport || isLoadingIdReport) &&
                exportType === EXPORT_TYPE_ENUM.CSV
                  ? 'Exporting...'
                  : 'Download as CSV'}
              </Text>
              <Text cursor="pointer" onClick={() => openModal('share-email')}>
                Share via email
              </Text>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default ShareReportPopover;
