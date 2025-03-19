import { Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface ActionCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}
const ActionCard = (props: ActionCardProps) => {
  const { title, subtitle, children } = props;
  return (
    <VStack
      width="full"
      justifyContent="space-between"
      bgColor="white"
      rounded="8px"
      boxShadow="0px 4px 4px 0px #0000001A"
      spacing={{ base: '60px', lg: '102px' }}
      p="16px"
      pb={{ base: '25px', md: '16px' }}
      alignItems="flex-start"
    >
      <VStack width="full" alignItems="flex-start" spacing="24px">
        <Heading color="primary.500" size={{ base: 'xl', lg: '2xl' }}>
          {title}
        </Heading>
        <Text
          color="neutral.600"
          fontWeight={400}
          fontSize={{ base: '14px', lg: '16px' }}
          lineHeight={{ base: '20px', lg: '24px' }}
        >
          {subtitle}
        </Text>
      </VStack>
      {children}
    </VStack>
  );
};

export default ActionCard;
