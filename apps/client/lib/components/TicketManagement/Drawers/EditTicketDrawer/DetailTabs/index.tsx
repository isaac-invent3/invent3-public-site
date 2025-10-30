import React from 'react';
import DynamicTabs from '~/lib/components/UI/DynamicTab';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import TicketActivity from '../../Common/TicketActivity';
import ScheduledTicketTasks from '../../Common/ScheduledTicketTasks';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import SuggestedSpartParts from './SparePartsReservation';
import { Flex } from '@chakra-ui/react';

interface DetailTabsProps {
  data: Ticket;
  scheduleId?: number;
  isFetchingSchedule: boolean;
}
const DetailTabs = (props: DetailTabsProps) => {
  const { data, scheduleId, isFetchingSchedule } = props;
  const { getSearchParam } = useCustomSearchParams();
  const tabParam = getSearchParam('tab');

  const AllTabs = [
    {
      name: 'Ticket Activity',
      component: <TicketActivity ticketId={data?.ticketId} />,
    },
    {
      name: 'Tasks',
      component: (
        <ScheduledTicketTasks
          data={data}
          scheduleId={scheduleId}
          isFetchingSchedule={isFetchingSchedule}
        />
      ),
    },
    {
      name: 'Spare Parts Reservation',
      component: <SuggestedSpartParts />,
    },
  ];

  return (
    <Flex width="full">
      <DynamicTabs
        tabs={AllTabs}
        activeTabParam={tabParam}
        onTabChange={undefined}
        isLoading={false}
      />
    </Flex>
  );
};

export default DetailTabs;
