import { HStack, Switch, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FilterButton, SearchInput } from '@repo/ui/components';
import SectionWrapper from '~/lib/components/Profile/Common/SectionWrapper';
import { FilterIcon } from '../../CustomIcons';

const ThirdParty = () => {
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <HStack width="full" justifyContent="space-between">
        <Text fontWeight={700} size="lg">
          Third-Party Integrations
        </Text>
        <Switch size="sm" />
      </HStack>
      <VStack width="full" spacing="16px">
        <SectionWrapper
          title="Available Integrations"
          subtitle="Connect with powerful third-party tools"
          sectionInfoWidth="212px"
          spacing="16px"
          direction={{ base: 'column', md: 'row' }}
          sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
        >
          <HStack spacing="16px" flexWrap="wrap">
            <SearchInput setSearch={setSearch} width="187px" />
            <FilterButton
              handleClick={() => {}}
              isActive={false}
              label="Filters"
              icon={FilterIcon}
              bgColor="#F4F4F4"
            />
          </HStack>
        </SectionWrapper>
      </VStack>
    </VStack>
  );
};

export default ThirdParty;
