import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import ScheduleTitle from './Title';
import Description from './Description';
import Type from './Type';
import Date from './Date';
import ServiceLevelAgreement from './SLA';
import Tasks from './Tasks';
import Frequency from '~/lib/components/Common/Frequency';

const SectionTwo = () => {
  return (
    <VStack spacing="45px" width="full" alignItems="flex-start">
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="40px"
      >
        <ScheduleTitle />
        <Type />
      </SimpleGrid>
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="40px"
      >
        <Description />
        <Frequency />
      </SimpleGrid>
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="40px"
      >
        <Date />
        <ServiceLevelAgreement />
      </SimpleGrid>
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="40px"
      >
        <Tasks />
      </SimpleGrid>
    </VStack>
  );
};

export default SectionTwo;
