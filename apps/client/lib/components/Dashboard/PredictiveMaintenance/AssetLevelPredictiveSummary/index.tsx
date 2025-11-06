import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import CardHeader from '../../Common/CardHeader';
import useAssetPredictiveLevelTable from '../../hooks/useAssetPredictiveLevelTable';
import AssetPredictiveLevelModal from '../../Modals/AssetPredictiveLevelModal';

const AssetLevelPredictiveSummary = () => {
  const { AssetPredictiveLevelTable } = useAssetPredictiveLevelTable({
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
          <CardHeader>Asset-Level Predictive Summary</CardHeader>
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
            View Full Predictive Maintenance Report
          </Button>
        </HStack>
        <Flex width="full">{AssetPredictiveLevelTable}</Flex>
      </VStack>
      {isOpen && (
        <AssetPredictiveLevelModal isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export default AssetLevelPredictiveSummary;
