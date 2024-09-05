import { HStack } from '@chakra-ui/react';
import React from 'react';
import SearchInput from '../UI/SearchInput';

interface FiltersProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const Filters = (props: FiltersProps) => {
  const { setSearch } = props;

  return (
    <HStack spacing="16px">
      <SearchInput setSearch={setSearch} placeholderText="Search in Grid" />
    </HStack>
  );
};

export default Filters;
