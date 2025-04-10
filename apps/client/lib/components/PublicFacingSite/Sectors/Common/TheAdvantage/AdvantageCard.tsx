import { Flex, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { TripleCircleIcon } from '~/lib/components/CustomIcons/PublicFacingSite';

interface AdvantageCardProps {
  title: string;
  description: string;
  image: string;
}
const AdvantageCard = (props: AdvantageCardProps) => {
  const { title, description, image } = props;
  return (
    <VStack
      spacing="32px"
      width="full"
      maxW={{ base: '583px', lg: '216px' }}
      height={{ lg: '419px' }}
      bgColor="#F2F1F14D"
      rounded="8px"
      justifyContent="flex-end"
      role="group"
      p="24px"
      _hover={{
        maxW: { lg: 'full' },
        height: { lg: 'full' },
        px: { lg: '40px' },
        py: { lg: '73px' },
      }}
      transition="all 300ms ease-in-out"
    >
      <VStack
        spacing="24px"
        alignItems="flex-start"
        display={{ base: 'none', lg: 'flex' }}
        _groupHover={{ display: 'none' }}
        transition="all 300ms ease-in-out"
      >
        <Icon as={TripleCircleIcon} boxSize="24px" />
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
        display={{ base: 'flex', lg: 'none' }}
        _groupHover={{ display: 'flex' }}
        transition="all 300ms ease-in-out"
      >
        <Flex position="relative" width="240px" height="240px">
          <Image src={image} alt="advantage-image" fill />
        </Flex>
        <VStack alignItems="flex-start" spacing="16px">
          <VStack
            alignItems="flex-start"
            spacing={{ base: '16px', lg: '12px' }}
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
