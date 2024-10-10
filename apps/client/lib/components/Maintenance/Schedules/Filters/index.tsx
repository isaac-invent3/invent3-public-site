import { HStack } from '@chakra-ui/react';
import React from 'react';
import { FilterIcon } from '~/lib/components/CustomIcons';
import FilterButton from '~/lib/components/UI/Filter/FilterButton';
import SearchInput from '~/lib/components/UI/SearchInput';

interface FiltersProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  activeFilter: 'schedule' | 'plan' | 'history' | null;
  setActiveFilter: React.Dispatch<
    React.SetStateAction<'schedule' | 'plan' | 'history' | null>
  >;
}
const Filters = (props: FiltersProps) => {
  const { setSearch, activeFilter, setActiveFilter } = props;

  return (
    <HStack spacing="16px" width="full">
      <SearchInput setSearch={setSearch} placeholderText="Search..." />
      <FilterButton
        icon={FilterIcon}
        label="Filters"
        handleClick={() =>
          setActiveFilter((prev) => (prev === 'schedule' ? null : 'schedule'))
        }
        isActive={activeFilter === 'schedule'}
      />
    </HStack>
  );
};

export default Filters;
