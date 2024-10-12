import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import ScheduleTitle from './Title';
import Description from './Description';
import Type from './Type';
import Date from './Date';
import Comment from './Comment';
import Frequency from './Frequency';
import ServiceLevelAgreement from './SLA';

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
        <Frequency />
        <ServiceLevelAgreement />
      </SimpleGrid>
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="40px"
      >
        <Description />
        <Comment />
      </SimpleGrid>
      <Date />
    </VStack>
  );
};

export default SectionTwo;
