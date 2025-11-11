import { Stack } from '@chakra-ui/react';
import { FilterButton, SearchInput } from '@repo/ui/components';
import React, { useState } from 'react';
import { FilterIcon } from '~/lib/components/CustomIcons';

const Filter = () => {
  const [search, setSearch] = useState('');
  return (
    <Stack
      spacing="16px"
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      px={{ base: '16px', md: 0 }}
      justifyContent="flex-end"
      borderBottom="1px solid #BBBBBB"
      pb={2}
    >
      <SearchInput
        setSearch={setSearch}
        placeholderText="Search in Grid"
        containerStyle={{ minW: { base: 'full', lg: 'max-content' } }}
        customStyle={{ minW: { base: 'full', lg: 'max-content' } }}
      />
      <FilterButton
        icon={FilterIcon}
        label="Bulk Actions"
        handleClick={() => {}}
        isActive={false}
      />
    </Stack>
  );
};

export default Filter;
