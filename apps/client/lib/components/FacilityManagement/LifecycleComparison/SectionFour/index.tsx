import { Flex } from '@chakra-ui/react';
import React from 'react';
import RUL from './RUL';
import InsightsPanel from './InsightsPanel';
import { LifeCycleFilter } from '~/lib/interfaces/location/lifecycle.interfaces';

const SectionFour = ({ filters }: { filters: LifeCycleFilter }) => {
  return (
    <Flex width="full" gap="16px" direction={{ base: 'column', lg: 'row' }}>
      <Flex width={{ base: 'full', lg: '501px' }}>
        <RUL filters={filters} />
      </Flex>
      <Flex width="full" maxW={{ lg: 'calc(100% - 501px)' }}>
        <InsightsPanel  filters={filters}/>
      </Flex>
    </Flex>
  );
};

export default SectionFour;
