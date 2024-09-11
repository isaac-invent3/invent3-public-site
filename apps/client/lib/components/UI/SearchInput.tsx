import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React, { useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { SearchIcon } from '../CustomIcons/layout';

interface ISearchInput {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeholderText?: string;
  width?: string;
  customStyle?: { [key: string]: unknown };
}

const SearchInput = (props: ISearchInput) => {
  const [searchText, setSearchText] = useState('');
  const {
    setSearch,
    placeholderText = 'Search',
    width = '246px',
    customStyle,
  } = props;

  // Use useMemo to create a memoized version of the debounced function
  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 500), // 500ms debounce
    [setSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSetSearch(value); // Call the debounced function
  };

  return (
    <InputGroup alignItems="center" height="36px" width={width}>
      <InputLeftElement pb="6px">
        <Icon as={SearchIcon} boxSize="24px" color="neutral.800" />
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
        py="6px"
        px="12px"
        minH="36px"
        width={width}
        _placeholder={{
          color: 'neutral.300',
        }}
        value={searchText}
        outline="none"
        _focusVisible={{
          border: 'none',
        }}
        onChange={handleSearchChange} // Use the debounced handler
        {...customStyle}
      />
    </InputGroup>
  );
};

export default SearchInput;
