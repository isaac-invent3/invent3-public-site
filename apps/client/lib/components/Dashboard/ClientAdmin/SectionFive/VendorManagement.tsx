import { HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import CardHeader from '../../Common/CardHeader';
import VendorTable from '~/lib/components/VendorManagement/VendorTable';
import { useGetAllVendorsQuery } from '~/lib/redux/services/vendor.services';
import useVendorTable from '~/lib/components/VendorManagement/VendorTable/useVendorTable';
import VendorModal from '../../Modals/VendorModal';

const VendorManagement = () => {
  const { VendorInfoTable } = useVendorTable({
    customPageSize: 5,
    showFooter: false,
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
        <HStack width="full" justifyContent="space-between">
          <CardHeader>Vendor Management</CardHeader>
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
        {VendorInfoTable}
      </VStack>
      {isOpen && <VendorModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default VendorManagement;
