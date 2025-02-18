import { HStack, Stack } from '@chakra-ui/react';

import { SearchInput, FilterButton } from '@repo/ui/components';
import { BulkSearchIcon, FilterIcon } from '../../CustomIcons';
import ExportPopover from './ExportPopover';

interface FiltersProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  activeFilter: 'bulk' | 'general' | null;
  setActiveFilter: React.Dispatch<
    React.SetStateAction<'bulk' | 'general' | null>
  >;
}
const Filters = (props: FiltersProps) => {
  const { setSearch, activeFilter, setActiveFilter } = props;

  return (
    <Stack
      spacing="16px"
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      px={{ base: '16px', md: 0 }}
    >
      <SearchInput
        setSearch={setSearch}
        placeholderText="Search in Grid"
        containerStyle={{ minW: { base: 'full', lg: 'max-content' } }}
        customStyle={{ minW: { base: 'full', lg: 'max-content' } }}
      />
      <HStack spacing="16px" width="full" flexWrap="wrap">
        <FilterButton
          icon={BulkSearchIcon}
          label="Bulk Actions"
          handleClick={() =>
            setActiveFilter((prev) => (prev === 'bulk' ? null : 'bulk'))
          }
          isActive={activeFilter === 'bulk'}
        />
        <FilterButton
          icon={FilterIcon}
          label="Filters"
          handleClick={() =>
            setActiveFilter((prev) => (prev === 'general' ? null : 'general'))
          }
          isActive={activeFilter === 'general'}
        />
        <ExportPopover />
      </HStack>
    </Stack>
  );
};

export default Filters;
