import React, { useState } from 'react';
import { generateWeekDays } from './utils';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { WeekType } from '~/lib/interfaces/dashboard.interfaces';

const Tab = ({ weekType }: { weekType: WeekType }) => {
  const [selected, setSelected] = useState(0);
  const data = generateWeekDays(weekType);
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
          borderBottomWidth={selected === index ? '2px' : 0}
          key={index}
          onClick={() => {
            setSelected(index);
          }}
          as="button"
        >
          <Text
            fontWeight={400}
            color="neutral.600"
            visibility={selected === index ? 'visible' : 'hidden'}
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
