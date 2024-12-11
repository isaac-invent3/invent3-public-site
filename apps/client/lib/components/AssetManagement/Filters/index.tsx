import { HStack, Icon } from '@chakra-ui/react';

import SearchInput from '../../UI/SearchInput';
import { Button } from '@repo/ui/components';
import { BulkSearchIcon, DownloadIcon, FilterIcon } from '../../CustomIcons';
import FilterButton from '../../UI/Filter/FilterButton';

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
    <HStack spacing="16px" width="full">
      <SearchInput setSearch={setSearch} placeholderText="Search in Grid" />
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
      <Button
        customStyles={{
          minH: '36px',
          p: '0px',
          px: '8px',
          minW: '100px',
          justifyContent: 'flex-start',
        }}
      >
        <Icon as={DownloadIcon} boxSize="24px" mr="8px" />
        Export
      </Button>
    </HStack>
  );
};

export default Filters;
