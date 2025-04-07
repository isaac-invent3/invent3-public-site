import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

interface SolutionCardProps {
  icon: string;
  title: string;
  description: string;
}
const SolutionCard = (props: SolutionCardProps) => {
  const { icon, title, description } = props;
  return (
    <VStack
      width="full"
      spacing="24px"
      alignItems="flex-start"
      rounded="10px"
      bgColor="#F3F3F3"
      p="16px"
      pb={{ base: '16px', lg: '24px' }}
    >
      <VStack width="full" spacing="16px" alignItems="flex-start">
        <Flex position="relative" width="40px" height="40px">
          <Image src={icon} fill alt={`${title} icon`} />
        </Flex>
        <Heading color="black" fontWeight={800} fontSize="20px">
          {title}
        </Heading>
      </VStack>
      <Text fontWeight={400} fontSize="14px" color="#515151" lineHeight="20px">
        {description}
      </Text>
    </VStack>
  );
};

export default SolutionCard;
