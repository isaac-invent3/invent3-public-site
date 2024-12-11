import { VStack } from '@chakra-ui/react';
import React from 'react';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';

interface MaintenanceScheduleCardProps {
  data: MaintenanceSchedule;
  isPartOfDefaultPlan?: boolean;
}
const MaintenanceScheduleCard = (props: MaintenanceScheduleCardProps) => {
  const { data, isPartOfDefaultPlan = false } = props;

  return (
    <>
      <VStack
        width="full"
        border="1px solid #BBBBBB80"
        rounded="8px"
        spacing={0}
        overflow="hidden"
      >
        <SectionOne data={data} />
        <SectionTwo data={data} isPartOfDefaultPlan={isPartOfDefaultPlan} />
      </VStack>
    </>
  );
};

export default MaintenanceScheduleCard;
