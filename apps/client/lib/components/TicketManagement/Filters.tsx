import { HStack } from '@chakra-ui/react';

import { FilterIcon } from '~/lib/components/CustomIcons';
import FilterButton from '~/lib/components/UI/Filter/FilterButton';
import SearchInput from '~/lib/components/UI/SearchInput';

interface FiltersProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showFilter: boolean;
  setShowFilter: () => void;
}
const Filters = (props: FiltersProps) => {
  const { setSearch, showFilter, setShowFilter } = props;

  return (
    <HStack spacing="16px" width="full">
      <SearchInput setSearch={setSearch} placeholderText="Search..." />
      <FilterButton
        icon={FilterIcon}
        label="Filters"
        handleClick={() => setShowFilter()}
        isActive={showFilter}
      />
    </HStack>
  );
};

export default Filters;
