import { HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button, DataTable } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import CardHeader from '../CardHeader';
import useUserActivityTable from '../../hooks/useUserActivityTable';
import UserActivityModal from '../../Modals/UserActivityModal';

const UserActivityTable = () => {
  const { UserActivityTable } = useUserActivityTable({ customPageSize: 5 });
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
        bgColor="white"
        rounded="8px"
        spacing="16px"
      >
        <HStack width="full" justifyContent="space-between">
          <CardHeader>User Activity</CardHeader>
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
        {UserActivityTable}
      </VStack>
      {isOpen && <UserActivityModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default UserActivityTable;
