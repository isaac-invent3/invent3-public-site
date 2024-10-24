import React, { useState } from 'react';

import ScheduleSummary from '../../../Schedules/ScheduleForm/SummarySection/SectionTwo';
import { Flex, VStack } from '@chakra-ui/react';
import ScheduleList from '../ScheduleStep/ScheduleList';
import SlideTransition from '~/lib/components/UI/SlideTransition';

const SectionTwo = () => {
  const [showScheduleSummary, setShowScheduleSummary] = useState(false);
  return (
    <VStack width="full" spacing="24px">
      <ScheduleList type="list" setShowScheduleForm={setShowScheduleSummary} />
      <SlideTransition trigger={showScheduleSummary}>
        <Flex width="full" p="16px" rounded="8px" bgColor="#F5F6F7">
          <ScheduleSummary />
        </Flex>
      </SlideTransition>
    </VStack>
  );
};

export default SectionTwo;
