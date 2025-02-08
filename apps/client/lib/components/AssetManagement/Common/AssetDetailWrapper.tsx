import {
  Flex,
  Heading,
  HStack,
  Stack,
  StackProps,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import GenericStatusBox from '../../UI/GenericStatusBox';
import { Button } from '@repo/ui/components';
import React from 'react';
import AssetDetail from '../AssetDetail';

interface AssetDetailWrapperProps {
  showStatus: boolean;
  showMaintenanceHistoryButton?: boolean;
  customStyle?: StackProps;
  children?: React.ReactNode;
}
const AssetDetailWrapper = (props: AssetDetailWrapperProps) => {
  const { showStatus, showMaintenanceHistoryButton, customStyle, children } =
    props;
  const assetData = useAppSelector((state) => state.asset.asset);
  if (!assetData) {
    return null;
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { assetName, primaryImage, currentStatus, displayColorCode } =
    assetData;

  return (
    <>
      <VStack
        spacing="16px"
        alignItems="flex-start"
        width="full"
        {...customStyle}
      >
        <Stack
          width="full"
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          borderBottom="1px solid #BBBBBB80"
          pb="4px"
        >
          <DetailHeader
            variant="secondary"
            customStyles={{
              size: { base: 'md', lg: 'lg' },
              fontWeight: 700,
              borderBottom: 'none',
            }}
          >
            Asset Details
          </DetailHeader>
          <HStack
            spacing={{ base: '8px', sm: '16px' }}
            flexWrap={{ base: 'wrap', sm: 'nowrap' }}
            width="full"
          >
            {showMaintenanceHistoryButton && (
              <Button
                variant="outline"
                customStyles={{
                  height: '28px',
                  width: 'max-content',
                  paddingX: '12px',
                }}
                handleClick={onOpen}
              >
                View Maintenance History
              </Button>
            )}
            <Button
              variant="outline"
              customStyles={{
                height: '28px',
                width: 'max-content',
                paddingX: '12px',
              }}
              handleClick={onOpen}
            >
              View Full Asset Details
            </Button>
          </HStack>
        </Stack>

        <HStack spacing="16px" alignItems="flex-start" width="full">
          <Flex
            position="relative"
            width={{ base: '95.44px', md: '123px' }}
            height={{ base: '95.44px', md: '100px' }}
            overflow="hidden"
            rounded="12px"
            bgColor="neutral.100"
            flexShrink={0}
          >
            <Image
              src={`data:image/jpeg;base64,${primaryImage}`}
              fill
              alt="Asset image"
            />
          </Flex>
          <VStack
            spacing="16px"
            alignItems="flex-start"
            width="full"
            flexWrap="wrap"
          >
            <HStack spacing={{ base: '16px', lg: '24px' }} flexWrap="wrap">
              <Heading as="h4" size="lg" color="black">
                {assetName}
              </Heading>
              {showStatus && (
                <GenericStatusBox
                  text={currentStatus}
                  colorCode={displayColorCode}
                />
              )}
            </HStack>
            {children}
          </VStack>
        </HStack>
      </VStack>
      <AssetDetail onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default AssetDetailWrapper;
