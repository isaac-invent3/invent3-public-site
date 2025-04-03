import { Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import CardHeader from './CardHeader';
import useUpcomingMaintenanceTable from '../hooks/useUpcomingMaintenanceTable';
import UpcomingMaintenanceModal from '../Modals/UpcomingMaintenanceModal';

interface UpcomingMaintenanceProps {
  perUser?: boolean;
}
const UpcomingMaintenance = ({ perUser }: UpcomingMaintenanceProps) => {
  const { UpcomingMaintenanceTable } = useUpcomingMaintenanceTable({
    customPageSize: 5,
    perUser,
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
      >
        <HStack width="full" justifyContent="space-between" flexWrap="wrap">
          <HStack alignItems="center" flexWrap="wrap">
            <CardHeader>Upcoming Maintenance</CardHeader>
            <Text
              color="neutral.800"
              py="6px"
              px="8px"
              rounded="4px"
              bgColor="neutral.200"
            >
              Next 7 days
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
        <Flex width="full" height="full" overflow="auto" maxH="280px">
          {UpcomingMaintenanceTable}
        </Flex>
      </VStack>
      {isOpen && (
        <UpcomingMaintenanceModal
          isOpen={isOpen}
          onClose={onClose}
          perUser={perUser}
        />
      )}
    </>
  );
};

export default UpcomingMaintenance;
