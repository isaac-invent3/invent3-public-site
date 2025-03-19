import {
  Icon,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputLeftElementProps,
  InputProps,
} from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { SearchIcon } from './CustomIcons';

interface ISearchInput {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeholderText?: string;
  width?: string | object;
  customStyle?: InputProps;
  containerStyle?: InputGroupProps;
  leftElementStyle?: InputLeftElementProps;
  iconSize?: string;
}

const SearchInput = (props: ISearchInput) => {
  const [searchText, setSearchText] = useState('');
  const {
    setSearch,
    placeholderText = 'Search',
    width = '246px',
    customStyle,
    containerStyle,
    iconSize,
    leftElementStyle,
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
    <InputGroup
      alignItems="center"
      height="36px"
      width={width}
      display="flex"
      {...containerStyle}
    >
      <InputLeftElement pb="6px" {...leftElementStyle}>
        <Icon
          as={SearchIcon}
          boxSize={iconSize ?? '24px'}
          color="neutral.800"
        />
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
