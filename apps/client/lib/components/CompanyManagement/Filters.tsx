import { HStack, Icon, Stack } from '@chakra-ui/react';

import { Button, FilterButton, SearchInput } from '@repo/ui/components';
import { BulkSearchIcon, DownloadIcon, FilterIcon } from '../CustomIcons';

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
      my="2em"
      direction={{ base: 'column', lg: 'row' }}
      justifyContent="space-between"
      px={{ base: '16px', md: 0 }}
    >
      <SearchInput
        setSearch={setSearch}
        placeholderText="Search in Grid"
        containerStyle={{
          minW: { base: 'full', lg: '400px' },
        }}
        customStyle={{ minW: { base: 'full', lg: '400px' } }}
      />

      <HStack spacing="16px" flexWrap="wrap">
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
            height: '36px',
            p: '0px',
            px: '8px',
            width: '100px',
            justifyContent: 'flex-start',
          }}
        >
          <Icon as={DownloadIcon} boxSize="24px" mr="8px" />
          Export
        </Button>
      </HStack>
    </Stack>
  );
};

export default Filters;
