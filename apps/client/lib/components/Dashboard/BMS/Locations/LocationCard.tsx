import { Flex, Icon, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ForwardIcon } from '~/lib/components/CustomIcons/Dashboard';

interface LocationCardProps {
  id: number;
  facilityName: string;
  lgaName: string;
  stateName: string;
}
const LocationCard = (props: LocationCardProps) => {
  const { id, facilityName, lgaName, stateName } = props;
  return (
    <Link href={`/dashboard/bms/${id}`}>
      <VStack
        spacing="0px"
        minW="206px"
        height="175px"
        rounded="8px"
        bgColor="#F2F1F1"
        overflow="hidden"
      >
        <Flex
          width="full"
          position="relative"
          height="112px"
          bgColor="neutral.100"
        >
          <Image fill src="/bms-location-1.png" alt="location image" />
        </Flex>
        <VStack
          width="full"
          padding="8px"
          spacing="2px"
          alignItems="flex-start"
        >
          <Text
            size="md"
            fontWeight={800}
            color="neutral.800"
            noOfLines={1}
            textOverflow="ellipsis"
          >
            {facilityName}
          </Text>
          <Text color="neutral.600" noOfLines={1} textOverflow="ellipsis">
            {lgaName}, {stateName}
          </Text>
          <Flex
            width="16px"
            height="16px"
            bgColor="primary.500"
            justifyContent="center"
            alignItems="center"
            alignSelf="flex-end"
            rounded="full"
          >
            <Icon as={ForwardIcon} boxSize="10px" color="white" />
          </Flex>
        </VStack>
      </VStack>
    </Link>
  );
};

export default LocationCard;
