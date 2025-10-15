import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { SearchIcon } from '../../../../../client/lib/components/CustomIcons/layout';
import { Button } from '@repo/ui/components';

interface SearchComponentProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeholderText?: string;
}
const SearchComponent = (props: SearchComponentProps) => {
  const { placeholderText = 'Search for any topic...', setSearch } = props;
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    if (value === '') {
      setSearch('');
    }
  };
  return (
    <InputGroup
      alignItems="center"
      minH={{ base: '62px', md: '81px' }}
      width="full"
      display="flex"
    >
      <InputLeftElement pt={{ base: '20px', md: '40px' }}>
        <Icon as={SearchIcon} boxSize="24px" color="neutral.600" />
      </InputLeftElement>

      <Input
        type="text"
        placeholder={placeholderText}
        fontSize="12px"
        fontWeight={500}
        lineHeight="14.26px"
        bgColor="white"
        color="neutral.800"
        rounded="8px"
        pr="130px"
        minH={{ base: '62px', md: '81px' }}
        minW="full"
        _placeholder={{
          color: 'neutral.600',
        }}
        value={searchText}
        outline="none"
        _focusVisible={{
          border: 'none',
        }}
        onChange={handleSearchChange} // Use the debounced handler
      />
      <InputRightElement pt={{ base: '23px', md: '40px' }} pr="63px">
        <Button
          handleClick={() => setSearch(searchText)}
          customStyles={{
            minH: { base: '46px', lg: '49px' },
            minW: { base: '106px', lg: '112px' },
            rounded: 'full',
          }}
        >
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchComponent;
