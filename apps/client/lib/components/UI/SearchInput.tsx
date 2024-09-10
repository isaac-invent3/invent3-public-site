import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import type React from 'react';
import { useState } from 'react';
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
        // pl="40px"
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
        onChange={(e) => {
          setSearchText(e.target.value);
          const timeout = setTimeout(() => {
            setSearch(e.target.value);
          }, 3000);

          return () => clearTimeout(timeout);
        }}
        {...customStyle}
      />
    </InputGroup>
  );
};

export default SearchInput;
