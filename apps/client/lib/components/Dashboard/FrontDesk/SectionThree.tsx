import { HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../Common/CardHeader';
import { Button } from '@repo/ui/components';
import { useGetTicketsByTabScopeQuery } from '~/lib/redux/services/ticket.services';
import TicketTable from '../../TicketManagement/TicketTable';
import TicketModal from '../Modals/TicketModal';

const SectionThree = () => {
  const { data, isLoading, isFetching } = useGetTicketsByTabScopeQuery({
    pageNumber: 1,
    pageSize: 5,
    tabScopeName: 'new',
  });
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <VStack
        width="full"
        pl="16px"
        pr="15px"
        pt="21px"
        pb="12px"
        alignItems="flex-start"
        spacing="16px"
        bgColor="white"
        rounded="8px"
      >
        <HStack width="full" justifyContent="space-between">
          <HStack width="full" alignItems="center">
            <CardHeader>Unassigned Tickets</CardHeader>
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
        <TicketTable
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          isSelectable={false}
          emptyLines={4}
          shouldHideFooter
        />
      </VStack>
      {isOpen && <TicketModal isOpen={isOpen} onClose={onClose} scope="new" />}
    </>
  );
};

export default SectionThree;
