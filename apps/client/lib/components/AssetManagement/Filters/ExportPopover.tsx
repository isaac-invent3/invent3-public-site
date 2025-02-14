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
import { DownloadIcon } from '~/lib/components/CustomIcons';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useAppSelector } from '~/lib/redux/hooks';
import { useExportAssetMutation } from '~/lib/redux/services/asset/general.services';
import { EXPORT_TYPE_ENUM } from '~/lib/utils/constants';

const ExportPopover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedAssetIds = useAppSelector(
    (state) => state.asset.selectedAssetIds
  );
  const toast = useToast();
  const { handleSubmit } = useCustomMutation();
  const [exportAsset, { isLoading }] = useExportAssetMutation();

  const handlePopoverClick = () => {
    if (selectedAssetIds.length > 0) {
      onOpen();
    } else {
      toast({
        title: 'No Asset Selected',
        description: 'Please select atleast one asset',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleExport = async (exportType: number) => {
    await handleSubmit(exportAsset, {
      exportType: exportType,
      assetIds: selectedAssetIds,
    });
  };

  return (
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
          <PopoverBody p="16px" onClick={onClose}>
            <VStack spacing="12px">
              <Text
                color="#0E2642"
                textAlign="center"
                cursor="pointer"
                onClick={() => handleExport(EXPORT_TYPE_ENUM.CSV)}
              >
                {isLoading ? 'Exporting...' : 'Export as CSV'}
              </Text>
              <Text
                color="#0E2642"
                textAlign="center"
                cursor="pointer"
                onClick={() => handleExport(EXPORT_TYPE_ENUM.PDF)}
              >
                {isLoading ? 'Exporting...' : 'Export as PDF'}
              </Text>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ExportPopover;
