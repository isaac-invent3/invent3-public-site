import { Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import PageHeader from '../../UI/PageHeader';
import { DatePopover } from '@repo/ui/components';
import moment from 'moment';
import { Icon } from '@chakra-ui/icons';
import { CalendarIcon, ChevronDownIcon } from '../../CustomIcons';
import Image from 'next/image';

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
      <HStack
        height="full"
        minH="121px"
        width="full"
        maxW="361px"
        bgColor="#E5F1FF"
        rounded="8px"
        spacing="43px"
        py="16px"
        px="12px"
      >
        <VStack alignItems="flex-start" spacing="40px" width="60%">
          <VStack alignItems="flex-start" spacing="2px">
            <Text size="md" color="neutral.600" fontWeight={700}>
              Oniru, VI
            </Text>
            <Text color="neutral.600" fontSize="10px" lineHeight="16px">
              Mon, 24 Aug
            </Text>
          </VStack>
          <HStack spacing="27px">
            <Text
              fontSize="48px"
              lineHeight="0.12em"
              fontWeight={800}
              color="neutral.800"
              position="relative"
            >
              34
              <Text
                as="span"
                fontSize="30px"
                lineHeight="0.12em"
                fontWeight={800}
                color="neutral.800"
                position="absolute"
                top={-3}
              >
                o
              </Text>
            </Text>
            <VStack
              alignItems="flex-start"
              spacing="2px"
              color="neutral.600"
              fontSize="10px"
              lineHeight="16px"
            >
              <Text>Partly Cloudy</Text>
              <Text>H: 34o | L: 30o</Text>
            </VStack>
          </HStack>
        </VStack>
        <Flex position="relative" width="121.73px" height="70.66px">
          <Image src="/cloud.png" fill alt="cloud" />
        </Flex>
      </HStack>
    </Stack>
  );
};

export default Header;
