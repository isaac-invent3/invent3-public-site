import { Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { ForwardIcon } from '../../../CustomIcons/Dashboard';

interface SummaryInfoCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  facilityName?: string;
  address?: string;
}

const SummaryInfoCard = (props: SummaryInfoCardProps) => {
  const { title, icon, children, facilityName, address } = props;
  return (
    <VStack
      bgColor="#F2F1F1"
      rounded="8px"
      p="16px"
      spacing="20px"
      width="full"
    >
      <HStack justifyContent="space-between" width="full">
        <Text color="neutral.800" fontWeight={800} maxW="99px">
          {title}
        </Text>
        <Flex position="relative" width="44px" height="44px">
          <Image src={icon} fill alt="icon" />
        </Flex>
      </HStack>
      <VStack width="full" height="full" justifyContent="space-between">
        <HStack
          width="full"
          justifyContent="space-between"
          spacing="17.5px"
          alignItems="flex-start"
        >
          <Flex width="50%">{children}</Flex>
          <VStack alignItems="flex-start" spacing="4px" width="50%">
            <Text size="lg" fontWeight={800} color="black">
              {facilityName}
            </Text>
            <Text color="neutral.600" fontWeight={700}>
              {address}
            </Text>
          </VStack>
        </HStack>
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
  );
};

export default SummaryInfoCard;
