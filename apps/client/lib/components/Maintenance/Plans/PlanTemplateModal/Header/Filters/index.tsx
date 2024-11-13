import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
  Box,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { FilterIcon } from '~/lib/components/CustomIcons';
import FilterButton from '~/lib/components/UI/Filter/FilterButton';
import OwnerFilter from './OwnerFilter';
import CreatedDate from './CreatedDate';
import Button from '~/lib/components/UI/Button';

const FilterPopover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="blackAlpha.600"
          zIndex="9"
          onClick={onClose}
        />
      )}

      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom-end"
      >
        <PopoverTrigger>
          <HStack>
            <FilterButton
              icon={FilterIcon}
              label="Filters"
              handleClick={() => {}}
              isActive={false}
              border="1px solid #DADFE5"
            />
          </HStack>
        </PopoverTrigger>
        <PopoverContent
          p={0}
          m={0}
          position="relative"
          zIndex="999"
          width="full"
          rounded="8px"
          border="none"
          overflow="hidden"
          outline={0}
          _focus={{
            borderColor: 'transparent',
          }}
          _active={{
            borderColor: 'transparent',
          }}
          _focusVisible={{
            borderColor: 'transparent',
          }}
        >
          <Flex id="date-picker-portal" zIndex={999} position="fixed" />
          {isOpen && (
            <PopoverBody m={0} p="8px">
              <HStack spacing="8px" justifyContent="flex-end">
                <CreatedDate />
                <OwnerFilter />
                <Button customStyles={{ height: '36px' }}>Apply</Button>
              </HStack>
            </PopoverBody>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default FilterPopover;
