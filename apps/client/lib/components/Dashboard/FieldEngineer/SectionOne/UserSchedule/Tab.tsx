import React, { useEffect } from 'react';
import { generateWeekDays } from './utils';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { WeekType } from '~/lib/interfaces/dashboard.interfaces';
import moment from 'moment';

const Tab = ({
  weekType,
  dateSelected,
  setDateSelected,
}: {
  weekType: WeekType;
  dateSelected: string | undefined;
  setDateSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const data = generateWeekDays(weekType);

  useEffect(() => {
    if (weekType === 'this') {
      setDateSelected(moment().utcOffset(0).startOf('day').toISOString());
    } else {
      setDateSelected(data?.[0]?.fullDay);
    }
  }, [weekType]);

  return (
    <HStack
      width="full"
      borderBottomWidth="2px"
      borderColor="neutral.200"
      justifyContent="space-between"
    >
      {data?.map((item, index) => (
        <VStack
          pb="4px"
          spacing="4px"
          borderColor="#0366EF"
          borderBottomWidth={dateSelected === item.fullDay ? '2px' : 0}
          key={index}
          onClick={() => {
            setDateSelected(item.fullDay);
          }}
          as="button"
        >
          <Text
            fontWeight={400}
            color="neutral.600"
            visibility={dateSelected === item.fullDay ? 'visible' : 'hidden'}
          >
            {item.date}
          </Text>
          <Text color="neutral.800" fontWeight={700}>
            {item.day}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
};

export default Tab;
