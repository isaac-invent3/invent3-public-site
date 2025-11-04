import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import CardHeader from '../../Common/CardHeader';
import TicketResolutionModal from '../../Modals/TicketResolutionModal';
import useAssetPerformanceTableByCategory from '../../hooks/useAssetPerformanceTableByCategory';

const AssetPerformanceByCategoryTable = () => {
  const { AssetPerformanceTable } = useAssetPerformanceTableByCategory({
    customPageSize: 5,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack
        width="full"
        height="full"
        pl="16px"
        pr="15px"
        pt="21px"
        pb="12px"
        alignItems="flex-start"
        spacing="16px"
        bgColor="white"
        rounded="8px"
        minH="353px"
      >
        <HStack width="full" justifyContent="space-between">
          <CardHeader>Asset Performance by Category</CardHeader>
          <Button
            handleClick={onOpen}
            customStyles={{
              py: 0,
              height: '28px',
              width: '68px',
              fontSize: '12px',
              lineHeight: '14.26px',
            }}
          >
            View All
          </Button>
        </HStack>
        <Flex width="full">{AssetPerformanceTable}</Flex>
      </VStack>
      {isOpen && <TicketResolutionModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default AssetPerformanceByCategoryTable;
