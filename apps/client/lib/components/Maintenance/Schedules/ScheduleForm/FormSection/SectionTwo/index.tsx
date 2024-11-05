import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import ScheduleTitle from './Title';
import Description from './Description';
import Type from './Type';
import Date from './Date';
import ServiceLevelAgreement from './SLA';
import Tasks from './Tasks';
import { useAppSelector } from '~/lib/redux/hooks';

interface SectionTwoProps {
  descriptionHeight?: string;
  minScheduleDate: Date;
  maxScheduleDate: Date | undefined;
  buttonVariant: 'secondary' | 'outline';
}
const SectionTwo = (props: SectionTwoProps) => {
  const { descriptionHeight, minScheduleDate, maxScheduleDate, buttonVariant } =
    props;
  const { scheduleId } = useAppSelector(
    (state) => state.maintenance.scheduleForm
  );
  return (
    <VStack spacing="45px" width="full" alignItems="flex-start">
      <SimpleGrid
        columns={2}
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
        columns={2}
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
        columns={2}
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
        />
        <Tasks sectionMaxWidth="141px" spacing="41px" scheduleId={scheduleId} />
      </SimpleGrid>
    </VStack>
  );
};

export default SectionTwo;
