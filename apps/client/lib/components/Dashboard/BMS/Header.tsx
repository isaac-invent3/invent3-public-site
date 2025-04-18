import { HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import PageHeader from '../../UI/PageHeader';
import { DatePopover } from '@repo/ui/components';
import moment from 'moment';
import { Icon } from '@chakra-ui/icons';
import { CalendarIcon, ChevronDownIcon } from '../../CustomIcons';
import WeatherReading from './WeatherReading';

const Header = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  return (
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      spacing="24px"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <VStack spacing={{ base: '16px', lg: '52px' }} alignItems="flex-start">
        <PageHeader>BMS Dashboard</PageHeader>
        <DatePopover
          label="Date Created"
          selectedDate={
            selectedDate
              ? moment(selectedDate, 'DD MMMM YYYY').toDate()
              : undefined
          }
          setSelectedDate={(date) =>
            setSelectedDate(moment(date).format('DD MMMM YYYY'))
          }
          customButton={
            <HStack
              minW="220px"
              rounded="8px"
              bgColor="white"
              p="16px"
              spacing={{ base: '16px', lg: '13px' }}
              justifyContent="space-between"
              cursor="pointer"
            >
              <HStack spacing="8px">
                <Icon as={CalendarIcon} boxSize="16px" color="#374957" />
                <Text
                  fontWeight={800}
                  color="neutral.800"
                  fontSize={{ base: '14px', lg: '16px' }}
                  lineHeight={{ base: '20px', lg: '16px' }}
                >
                  Date:
                </Text>
                <Text
                  color="neutral.600"
                  fontWeight={700}
                  fontSize={{ base: '12px', lg: '14px' }}
                  lineHeight={{ base: '16px' }}
                >
                  {selectedDate ?? '----'}
                </Text>
              </HStack>
              <Icon as={ChevronDownIcon} boxSize="16px" color="#374957" />
            </HStack>
          }
        />
      </VStack>
      <WeatherReading />
    </Stack>
  );
};

export default Header;
