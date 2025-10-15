import { Flex, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

interface TeamCardProps {
  name: string;
  title: string;
  image: string;
}
const TeamCard = (props: TeamCardProps) => {
  const { name, title, image } = props;
  return (
    <VStack width="full" spacing="16px" alignItems="flex-start">
      <Flex
        position="relative"
        flex={1}
        minHeight={{ base: '275px' }}
        bgColor="neutral.100"
        width="full"
      >
        <Image src={image} alt={`${name} image`} fill />
      </Flex>
      <VStack alignItems="flex-start" spacing="8px">
        <Text color="black" size="lg" lineHeight="24px" fontWeight={800}>
          {name}
        </Text>
        <Text
          color="primary.500"
          size="md"
          lineHeight="20px"
          letterSpacing="0.04em"
        >
          {title}
        </Text>
      </VStack>
    </VStack>
  );
};

export default TeamCard;
