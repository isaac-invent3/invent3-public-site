import { Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const colorScheme = {
  0: '#79C7BA',
  1: '#9E91BF',
  2: '#60AACF',
  3: '#86D176',
};

interface SolutionCardProps {
  index: number;
  title: string;
  subtitle: string;
  activeSolution: number;
  setActiveSolution: React.Dispatch<React.SetStateAction<number>>;
}

const SolutionCard = (props: SolutionCardProps) => {
  const { activeSolution, setActiveSolution, index, title, subtitle } = props;
  return (
    <VStack
      spacing="0px"
      onMouseEnter={() => setActiveSolution(index)}
      onMouseLeave={() => setActiveSolution(0)}
      cursor="pointer"
      role="group"
      minH={{ md: '350px', lg: '450px' }}
      justifyContent="flex-end"
    >
      <Heading
        fontSize={{ base: '100px', md: '130px', xl: '200px' }}
        fontWeight={{ base: 700, lg: 800 }}
        lineHeight={{
          base: '104px',
          //   md: activeSolution === index ? '80px' : '40px',
          lg: activeSolution === index ? '100px' : '40px',
          xl: activeSolution === index ? '150px' : '40px',
        }}
        transition="line-height 300ms ease-in-out"
        color={colorScheme[index as keyof typeof colorScheme]}
      >
        0{index + 1}
      </Heading>
      <VStack
        spacing="32px"
        minH={{ base: '200px', lg: '297px' }}
        bgColor="white"
        padding="16px"
      >
        <Heading
          fontSize={{ base: '24px', lg: '28px' }}
          fontWeight={{ base: 700, lg: 800 }}
          color="primary.500"
          lineHeight="100%"
          textAlign="center"
        >
          {title}
        </Heading>
        <Text
          color="primary.accent"
          fontSize={{ base: '14px', lg: '16px' }}
          fontWeight={{ base: 500, lg: 400 }}
          textAlign="center"
          lineHeight="100%"
          display={{ lg: activeSolution === index ? 'flex' : 'none' }}
          opacity={{ lg: activeSolution === index ? 1 : 0 }}
          mt={{ lg: activeSolution === index ? 0 : '20px' }}
          transition="all 300ms ease-in-out"
        >
          {subtitle}
        </Text>
      </VStack>
    </VStack>
  );
};

export default SolutionCard;
