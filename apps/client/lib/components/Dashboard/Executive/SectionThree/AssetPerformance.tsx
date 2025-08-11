import { Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import CardHeader from '../../Common/CardHeader';
import useAssetPerformanceTable from '../../hooks/useAssetPerformanceTable';
import AssetPerformanceModal from '../../Modals/AssetPerformanceModal';

const AssetPerformanceTable = () => {
  const { AssetPerformanceTable } = useAssetPerformanceTable({
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
          <HStack>
            <CardHeader>Asset Performance</CardHeader>
            <Text
              color="neutral.800"
              py="6px"
              px="8px"
              rounded="4px"
              bgColor="neutral.200"
            >
              This Month
            </Text>
          </HStack>
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
      {isOpen && <AssetPerformanceModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default AssetPerformanceTable;
