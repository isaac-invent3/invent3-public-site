import {
  Flex,
  Heading,
  HStack,
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
        <HStack
          width="full"
          justifyContent="space-between"
          borderBottom="1px solid #BBBBBB80"
          pb="4px"
        >
          <DetailHeader
            variant="secondary"
            customStyles={{ size: 'lg', fontWeight: 700, borderBottom: 'none' }}
          >
            Asset Details
          </DetailHeader>
          <HStack spacing="16px">
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
        </HStack>

        <HStack spacing="16px" alignItems="flex-start" width="full">
          <Flex
            position="relative"
            width="123px"
            height="100px"
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
          <VStack spacing="16px" alignItems="flex-start" width="full">
            <HStack spacing="24px">
              <Heading
                as="h4"
                fontSize="24px"
                lineHeight="28.51px"
                color="black"
              >
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
      <AssetDetail data={assetData} onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default AssetDetailWrapper;
