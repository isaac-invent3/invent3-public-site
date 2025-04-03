'use client';

import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { SearchInput, SlideTransition } from '@repo/ui/components';
import _ from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { VendorFilter } from '~/lib/interfaces/vendor.interfaces';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';
import ActionButton from './Actions';
import VendorActionDisplay from './Actions/Display';
import VendorDetail from './VendorDetail';
import PageHeader from '../UI/PageHeader';
import useVendorTable from './VendorTable/useVendorTable';

export const initialFilterData = {
  startDate: undefined,
  endDate: undefined,
};

const VendorManagement = () => {
  const [search, setSearch] = useState('');
  const [activeAction, setActiveAction] = useState<'bulk' | 'filter' | null>(
    null
  );
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenDetails,
    onClose: onCloseDetails,
    onOpen: onOpenDetails,
  } = useDisclosure();
  const [filterData, setFilterData] = useState<VendorFilter>(initialFilterData);
  const searchParams = useSearchParams();
  const VendorId = searchParams?.get(SYSTEM_CONTEXT_DETAILS.VENDOR.slug);
  const { handleSearch, VendorInfoTable } = useVendorTable({
    search,
    filterData,
  });

  // Handles Toggling the  Filter
  useEffect(() => {
    if (activeAction && !isOpen) {
      onOpen();
    }
    if (!activeAction) {
      onClose();
    }
  }, [activeAction]);

  // Open Detail Modal if assetId exists
  useEffect(() => {
    if (VendorId) onOpenDetails();
  }, [VendorId]);

  return (
    <>
      <Flex width="full" direction="column" pb="24px">
        <VStack width="full" spacing="40px">
          <Flex px={{ base: '16px', md: 0 }} width="full">
            <PageHeader>Vendor Management</PageHeader>
          </Flex>
          <HStack
            width="full"
            justifyContent="space-between"
            borderBottom="1px"
            borderColor="neutral.300"
            pb="8px"
            flexWrap="wrap"
            px={{ base: '16px', md: 0 }}

            // display={{ base: 'none', lg: 'flex' }}
          >
            <SearchInput
              width={{ base: 'full', md: '100px' }}
              setSearch={setSearch}
              placeholderText="Search by name..."
              customStyle={{
                minW: { md: '363px', base: undefined },
              }}
            />
            <ActionButton
              activeAction={activeAction}
              setActiveAction={setActiveAction}
            />
          </HStack>
        </VStack>
        {isOpen && (
          <SlideTransition trigger={isOpen} direction="bottom">
            {isOpen && (
              <Flex width="full" mt="8px">
                <VendorActionDisplay
                  isOpen={isOpen}
                  activeAction={activeAction}
                  handleApplyFilter={handleSearch}
                  setFilterData={setFilterData}
                  filterData={filterData}
                />
              </Flex>
            )}
          </SlideTransition>
        )}

        <Flex width="full" mt="8px">
          {VendorInfoTable}
        </Flex>
      </Flex>
      <VendorDetail onClose={onCloseDetails} isOpen={isOpenDetails} />
    </>
  );
};

export default VendorManagement;
