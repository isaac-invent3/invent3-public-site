import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

interface AdvantageCardProps {
  index: number;
  title: string;
  description: string;
  image: string;
  activeAdvantage: number;
  setActiveAdvantage: React.Dispatch<React.SetStateAction<number>>;
}
const AdvantageCard = (props: AdvantageCardProps) => {
  const {
    index,
    title,
    description,
    image,
    activeAdvantage,
    setActiveAdvantage,
  } = props;
  return (
    <VStack
      spacing="32px"
      width="full"
      onMouseEnter={() => setActiveAdvantage(index)}
      onMouseLeave={() => setActiveAdvantage(0)}
      // maxW={{ base: '583px', lg: '216px' }}
      height={{
        base: 'full',
        lg: activeAdvantage === index ? 'full' : '419px',
      }}
      bgColor="#F2F1F14D"
      rounded="8px"
      justifyContent="flex-end"
      role="group"
      position="relative"
      px={{ base: '24px', lg: activeAdvantage === index ? '40px' : '24px' }}
      py={{ base: '24px', lg: activeAdvantage === index ? '73px' : '24px' }}
      // _hover={{
      //   // maxW: { lg: '302px' },
      //   height: { lg: 'full' },
      //   px: { lg: '40px' },
      //   py: { lg: '73px' },
      // }}
    >
      <VStack
        spacing="24px"
        alignItems="flex-start"
        display={{ base: 'none', lg: 'flex' }}
        position={{ lg: 'absolute' }}
        bottom={0}
        left={0}
        width="full"
        // maxW={{ base: '583px', lg: '216px' }}
        pl={{ lg: '24px' }}
        pb={{ lg: '24px' }}
        opacity={{ lg: activeAdvantage === index ? 0 : 1 }}
        transform={{
          lg: activeAdvantage === index ? 'translateY(-20px)' : 'translateY(0)',
        }}
        transition="all 400ms ease-in-out"
      >
        <Flex position="relative" width="24px" height="24px">
          <Image src={image} fill alt="advantage-image" />
        </Flex>
        <Text
          color="primary.accent"
          fontWeight={700}
          fontSize="16px"
          lineHeight="100%"
        >
          {title}
        </Text>
      </VStack>

      <VStack
        width="full"
        display={{ base: 'flex' }}
        opacity={{ base: 1, lg: activeAdvantage === index ? 1 : 0 }}
        transform={{
          lg: activeAdvantage === index ? 'translateY(0)' : 'translateY(100px)',
        }}
        transition="all 300ms ease-in-out"
      >
        {/* Image animation */}
        <Flex
          position="relative"
          width="240px"
          height="240px"
          transform={{
            lg:
              activeAdvantage === index ? 'translateY(0)' : 'translateY(100px)',
          }} // 45deg-ish angle
          opacity={{ lg: activeAdvantage === index ? 1 : 0 }}
          transition="all 400ms ease-in-out"
          transitionDelay="300ms"
        >
          <Image src={image} alt="advantage-image" fill />
        </Flex>

        {/* Text animation */}
        <VStack
          alignItems="flex-start"
          spacing="16px"
          opacity={{ lg: activeAdvantage === index ? 1 : 0 }}
          transform={{
            lg:
              activeAdvantage === index ? 'translateY(0)' : 'translateY(20px)',
          }}
          transition="all 300ms ease-in-out"
          transitionDelay="0ms"
        >
          <VStack
            alignItems="flex-start"
            spacing={{ base: '16px', lg: '12px' }}
            width="full"
          >
            <Heading
              fontWeight={{ base: 800, lg: 700 }}
              fontSize={{ base: '24px', lg: '32px' }}
              lineHeight={{ base: '32px', lg: '40px' }}
            >
              {title}
            </Heading>
            <Text
              fontWeight={{ base: 500, lg: 400 }}
              color="neutral.800"
              fontSize={{ base: '14px', lg: '16px' }}
              lineHeight="100%"
            >
              {description}
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default AdvantageCard;
