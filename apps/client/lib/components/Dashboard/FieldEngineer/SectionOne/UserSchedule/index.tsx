import {
  Flex,
  HStack,
  SimpleGrid,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import DropDown from '../../../Common/DropDown';
import CardHeader from '../../../Common/CardHeader';
import Tab from './Tab';
import { Option } from '@repo/interfaces';
import { WeekType } from '~/lib/interfaces/dashboard.interfaces';
import { useGetAllTaskInstancesQuery } from '~/lib/redux/services/task/instance.services';
import LoadingSkeleton from './LoadingSkeleton';
import SingleSchedule from './SingleSchedule';
import { generateWeekDays } from './utils';
import { useSession } from 'next-auth/react';
// import moment from 'moment';

const weekOptions = [
  {
    label: 'This Week',
    value: 'this',
  },
  {
    label: 'Next Week',
    value: 'next',
  },
];
const UsersSchedule = () => {
  const session = useSession();
  const user = session?.data?.user;
  const [selectedWeekType, setSelectedWeekType] = useState<Option | null>(
    weekOptions[0] ?? null
  );
  const dateArray = generateWeekDays('this');
  // eslint-disable-next-line no-unused-vars
  const [dateSelected, setDateSelected] = useState<string | undefined>(
    dateArray?.[0]?.fullDay
  );
  const { data, isLoading } = useGetAllTaskInstancesQuery({
    pageSize: 5,
    pageNumber: 1,
    assignedTo: user?.userId!,
    // startDate: dateSelected,
    // endDate: dateSelected
    //   ? moment(dateSelected).add(1, 'days').toISOString()
    //   : undefined,
  });

  return (
    <VStack width="full" rounded="8px" bgColor="white" height="full" p="16px">
      <HStack width="full" justifyContent="space-between">
        <VStack alignItems="8px" spacing="8px">
          <CardHeader>Schedule</CardHeader>
          <Text fontWeight={800} color="neutral.600">
            Here is your activity for this week
          </Text>
        </VStack>

        <DropDown
          options={weekOptions}
          label="Week"
          handleClick={(option) => setSelectedWeekType(option)}
          selectedOptions={selectedWeekType}
          width="100px"
        />
      </HStack>
      <Flex width="full" mt="32px" mb="24px">
        <Tab
          weekType={selectedWeekType?.value as WeekType}
          setDateSelected={setDateSelected}
        />
      </Flex>

      <SimpleGrid columns={3} width="full" mb="8px" ml="16px">
        {['Time', 'Task', 'Location'].map((item, index) => (
          <Text
            key={index}
            fontWeight={800}
            color="primary.500"
            letterSpacing="0.05em"
            size="md"
          >
            {item}
          </Text>
        ))}
      </SimpleGrid>
      {isLoading && <LoadingSkeleton numberOfSkeleton={5} />}
      {!isLoading && data?.data && data?.data?.items.length > 0 && (
        <VStack
          width="full"
          spacing="12px"
          divider={<StackDivider borderColor="neutral.200" borderWidth="1px" />}
          overflow="auto"
        >
          {data?.data?.items.map((item, index) => (
            <SingleSchedule data={item} key={index} />
          ))}
        </VStack>
      )}
      {!isLoading && data?.data && data?.data?.items.length === 0 && (
        <Text color="neutral.800" my="20%" width="full" textAlign="center">
          No Task at the moment
        </Text>
      )}
    </VStack>
  );
};

export default UsersSchedule;
