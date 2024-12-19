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
import { useAppDispatch } from '~/lib/redux/hooks';
import { DownloadIcon } from '../../CustomIcons';

type SelectedReportActions = 'download-pdf' | 'download-csv' | 'share-email';

interface PopoverActionProps {
  report: any;
}
const ShareReportPopover = (props: PopoverActionProps) => {
  const { report } = props;

  const dispatch = useAppDispatch();

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
              <Text cursor="pointer" onClick={() => openModal('download-pdf')}>
                Download as PDF
              </Text>
              <Text cursor="pointer" onClick={() => openModal('download-csv')}>
                Download as CSV
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
