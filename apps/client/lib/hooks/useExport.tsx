import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
  Box,
  VStack,
  Text,
  Icon,
  HStack,
  useToast,
} from '@chakra-ui/react';
import _ from 'lodash';
import { DownloadIcon } from '~/lib/components/CustomIcons';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useExportTableMutation } from '~/lib/redux/services/utility.services';
import { EXPORT_TYPE_ENUM } from '~/lib/utils/constants';
import { handleExport } from '~/lib/utils/helperFunctions';
import { ExportTableName } from '../interfaces/general.interfaces';
import { useState } from 'react';
import { getSession } from 'next-auth/react';

interface UseExportProps {
  ids: number[];
  exportTableName: ExportTableName;
  tableDisplayName: string;
  hasRequestedBy?: boolean;
  isQueued?: boolean;
}
const useExport = (props: UseExportProps) => {
  const {
    ids,
    exportTableName,
    tableDisplayName,
    hasRequestedBy = false,
    isQueued,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { handleSubmit } = useCustomMutation();
  const [exportTable, { isLoading }] = useExportTableMutation();
  const [exportType, setExportType] = useState<number | null>(null);

  const handlePopoverClick = () => {
    // if (ids.length > 0) {
    onOpen();
    // } else {
    //   toast({
    //     title: `No ${_.startCase(tableDisplayName)} Selected`,
    //     description: `Please select atleast one ${_.lowerCase(tableDisplayName)}`,
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true,
    //     position: 'top-right',
    //   });
    // }
  };

  const submitExport = async (exportType: number) => {
    const session = await getSession();
    const resp = await handleSubmit(
      exportTable,
      {
        tableName: exportTableName,
        exportType,
        ids,
        requestedBy: hasRequestedBy ? session?.user.username : undefined,
      },
      isQueued
        ? 'Export job has been queued. You will be notified when the export is complete.'
        : undefined
    );
    if (resp?.data?.data && !isQueued) {
      await handleExport(resp?.data?.data);
    }
  };

  const ExportPopover = (
    <>
      {/* Overlay */}
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="blackAlpha.600"
          zIndex="9"
          onClick={onClose}
        />
      )}

      <Popover
        isOpen={isOpen}
        onOpen={handlePopoverClick}
        onClose={onClose}
        placement="bottom-start"
      >
        <PopoverTrigger>
          <HStack
            width="100px"
            height="36px"
            rounded="8px"
            bgColor="primary.500"
            color="secondary.pale.500"
            px="8px"
            cursor="pointer"
          >
            <Icon as={DownloadIcon} boxSize="24px" />
            <Text color="secondary.pale.500" size="md">
              Export
            </Text>
          </HStack>
        </PopoverTrigger>
        <PopoverContent
          p={0}
          m={0}
          position="relative"
          zIndex="999"
          width="full"
          rounded="8px"
          border="none"
          overflow="hidden"
          outline={0}
          _focus={{
            borderColor: 'transparent',
          }}
          _active={{
            borderColor: 'transparent',
          }}
          _focusVisible={{
            borderColor: 'transparent',
          }}
        >
          <PopoverBody p="16px">
            <VStack spacing="12px">
              <Text
                color="#0E2642"
                textAlign="center"
                cursor="pointer"
                pointerEvents={isLoading ? 'none' : 'auto'}
                onClick={() => {
                  setExportType(EXPORT_TYPE_ENUM.CSV);
                  submitExport(EXPORT_TYPE_ENUM.CSV);
                }}
              >
                {isLoading && exportType === EXPORT_TYPE_ENUM.CSV
                  ? 'Exporting...'
                  : 'Export as CSV'}
              </Text>
              <Text
                color="#0E2642"
                textAlign="center"
                cursor="pointer"
                pointerEvents={isLoading ? 'none' : 'auto'}
                onClick={() => {
                  setExportType(EXPORT_TYPE_ENUM.PDF);
                  submitExport(EXPORT_TYPE_ENUM.PDF);
                }}
              >
                {isLoading && exportType === EXPORT_TYPE_ENUM.PDF
                  ? 'Exporting...'
                  : 'Export as PDF'}
              </Text>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );

  return {
    ExportPopover,
  };
};

export default useExport;
