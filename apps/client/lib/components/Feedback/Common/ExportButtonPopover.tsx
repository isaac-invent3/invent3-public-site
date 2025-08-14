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
import { useRef } from 'react';

import { Button } from '@repo/ui/components';
import { DownloadIcon } from '../../CustomIcons';

type SelectedReportActions = 'download-pdf' | 'download-csv' | 'share-email';

const ExportButtonPopover = () => {
  const openModal = (action: SelectedReportActions) => {};

  const popoverRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useOutsideClick({
    ref: popoverRef,
    handler: onClose,
  });

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
                py: '6px',
                px: '8px',
                pr: '24px',
                width: '94px',
                justifyContent: 'flex-start',
              }}
            >
              <Icon as={DownloadIcon} boxSize="18px" mr="8px" />
              Export
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
              <Text cursor="pointer" onClick={() => openModal('download-pdf')}>
                Download as PDF
              </Text>
              <Text cursor="pointer" onClick={() => openModal('download-csv')}>
                Download as CSV
              </Text>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default ExportButtonPopover;
