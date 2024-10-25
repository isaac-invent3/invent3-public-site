import React, { useState } from 'react';

import ScheduleSummary from '../../../Schedules/ScheduleForm/SummarySection/SectionTwo';
import { Flex, VStack } from '@chakra-ui/react';
import ScheduleList from '../ScheduleStep/ScheduleList';
import SlideTransition from '~/lib/components/UI/SlideTransition';
import { useAppSelector } from '~/lib/redux/hooks';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';

const SectionTwo = () => {
  const [showScheduleSummary, setShowScheduleSummary] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { schedules } = useAppSelector((state) => state.maintenance.planForm);
  return (
    <VStack width="full" spacing="8px">
      <ScheduleList
        type="list"
        showScheduleInfo={showScheduleSummary}
        setShowScheduleInfo={setShowScheduleSummary}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        selectMultiple
      />
      <SlideTransition trigger={showScheduleSummary}>
        <VStack width="full" spacing="24px">
          {selectedRows.map((item, index) => {
            const schedule: ScheduleFormDetails | undefined = schedules[item];
            if (schedule) {
              return (
                <Flex width="full" p="16px" rounded="8px" bgColor="#F5F6F7">
                  <ScheduleSummary formDetails={schedule} key={index} />
                </Flex>
              );
            }
            return null;
          })}
        </VStack>
      </SlideTransition>
    </VStack>
  );
};

export default SectionTwo;
