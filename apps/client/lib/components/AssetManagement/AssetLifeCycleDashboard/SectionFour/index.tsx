import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import AssetComparisonModal from './AssetComparisonModal';
import useAssetComparisonTable from './useAssetComparisonTable';

const SectionFour = () => {
  const { AssetComparisonTable } = useAssetComparisonTable({
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
        minH="352px"
      >
        <HStack width="full" justifyContent="space-between">
          <VStack alignItems="flex-start">
            <CardHeader>Asset Comparison Table</CardHeader>
          </VStack>
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
        <Flex width="full">{AssetComparisonTable}</Flex>
      </VStack>
      {isOpen && <AssetComparisonModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default SectionFour;
