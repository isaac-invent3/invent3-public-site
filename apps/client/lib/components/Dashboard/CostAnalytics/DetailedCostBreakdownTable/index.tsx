import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import CardHeader from '../../Common/CardHeader';
import useCostBreakdownTable from '../../hooks/useCostBreakdownTable';
import CostBreakdownModal from '../../Modals/CostBreakDownModal';

const DetailedCostBreakdownTable = () => {
  const { CostBreakDownTable } = useCostBreakdownTable({
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
          <CardHeader>Detailed Cost Breakdown</CardHeader>
          <Button
            handleClick={onOpen}
            customStyles={{
              py: 0,
              height: '28px',
              width: 'max-content',
              fontSize: '12px',
              lineHeight: '14.26px',
              rounded: '4px',
            }}
            variant="outline"
          >
            View Full Cost Breakdown Report
          </Button>
        </HStack>
        <Flex width="full">{CostBreakDownTable}</Flex>
      </VStack>
      {isOpen && <CostBreakdownModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default DetailedCostBreakdownTable;
