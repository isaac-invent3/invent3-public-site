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
import { useSession } from 'next-auth/react';
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
  const session = useSession();

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
    const resp = await handleSubmit(exportAsset, {
      exportType: exportType,
      assetIds: selectedAssetIds,
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Assets/Download?filePath=${resp?.data?.data}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.data?.user.accessToken}`,
            Apikey: `${session?.data?.user.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      const blob = await response.blob();

      // Trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resp?.data?.data ?? '';
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
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
          <PopoverBody p="16px">
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
