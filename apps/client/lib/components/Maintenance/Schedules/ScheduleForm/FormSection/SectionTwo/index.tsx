import { SimpleGrid, VStack } from '@chakra-ui/react';

import ScheduleTitle from './Title';
import Description from './Description';
import Type from './Type';
import Date from './Date';
import ServiceLevelAgreement from './SLA';
import Tasks from './Tasks';

interface SectionTwoProps {
  scheduleType?: 'main' | 'instance';
  descriptionHeight?: string;
  minScheduleDate: Date;
  maxScheduleDate: Date | undefined;
  buttonVariant: 'secondary' | 'outline';
}
const SectionTwo = (props: SectionTwoProps) => {
  const {
    scheduleType = 'main',
    descriptionHeight,
    minScheduleDate,
    maxScheduleDate,
    buttonVariant,
  } = props;
  return (
    <VStack spacing="45px" width="full" alignItems="flex-start">
      <SimpleGrid
         columns={{ base: 1, md: 2 }}
        alignItems="flex-start"
        width="full"
        spacing="40px"
      >
        <ScheduleTitle sectionMaxWidth="141px" spacing="41px" />
        <Type
          sectionMaxWidth="130px"
          spacing="56px"
          buttonVariant={buttonVariant}
        />
      </SimpleGrid>
      <SimpleGrid
         columns={{ base: 1, md: 2 }}
        alignItems="flex-start"
        width="full"
        spacing="40px"
      >
        <Description
          sectionMaxWidth="141px"
          spacing="41px"
          descriptionHeight={descriptionHeight}
        />
        <ServiceLevelAgreement
          sectionMaxWidth="130px"
          spacing="56px"
          buttonVariant={buttonVariant}
        />
      </SimpleGrid>
      <SimpleGrid
         columns={{ base: 1, md: 2 }}
        alignItems="flex-start"
        width="full"
        spacing="40px"
      >
        <Date
          sectionMaxWidth="141px"
          spacing="41px"
          minScheduleDate={minScheduleDate}
          maxScheduleDate={maxScheduleDate}
          buttonVariant={buttonVariant}
          scheduleType={scheduleType}
        />
        <Tasks
          showTaskCount={scheduleType === 'main'}
          sectionMaxWidth="141px"
          spacing="41px"
        />
      </SimpleGrid>
    </VStack>
  );
};

export default SectionTwo;
