import { HStack, ModalHeader, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SearchInput from '~/lib/components/UI/SearchInput';
import FilterPopover from './Filters';

interface HeaderProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const Header = (props: HeaderProps) => {
  const { setSearch } = props;
  return (
    <ModalHeader
      m={0}
      p={0}
      mt="32px"
      mx="24px"
      mb="8px"
      borderBottomWidth="1px"
      borderColor="neutral.300"
    >
      <VStack width="full" spacing="26px" alignItems="flex-start" pb="8px">
        <Text color="primary.500" size="md">
          Plan Templates
        </Text>
        <HStack spacing="16px" width="full" justifyContent="flex-end">
          <SearchInput
            setSearch={setSearch}
            placeholderText="Search"
            containerStyle={{
              border: '1px solid #DADFE5',
              rounded: '8px',
              overflow: 'hidden',
            }}
          />
          <FilterPopover />
        </HStack>
      </VStack>
    </ModalHeader>
  );
};

export default Header;
