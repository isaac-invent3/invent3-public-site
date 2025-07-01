import { Flex, HStack, Icon, Stack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { SOCIAL_LINKS } from './data';

const contactInfo = [
  'Info@Invent3.ai',
  '+447-65887-83792',
  '364 , downton Forth Delaware,',
];

const SectionTwo = () => {
  return (
    <Stack
      direction={{ base: 'column', xl: 'row' }}
      spacing={{ base: '24px', lg: '32px' }}
      alignItems="flex-start"
    >
      <VStack width="full" spacing="8px" alignItems="flex-start">
        <Text
          color="black"
          fontWeight={700}
          fontSize="18px"
          lineHeight="24px"
          whiteSpace="nowrap"
        >
          Contact Information
        </Text>
        {contactInfo.map((item, index) => (
          <Text key={index} size="md">
            {item}
          </Text>
        ))}
      </VStack>

      <VStack width="full" spacing="8px" alignItems="flex-start">
        <Text
          color="black"
          fontWeight={700}
          fontSize="18px"
          lineHeight="24px"
          whiteSpace="nowrap"
        >
          Follow Us On
        </Text>
        <HStack spacing="16px">
          {SOCIAL_LINKS.map((item, index) => (
            <Link href={item.link} key={index}>
              <Flex
                width="32px"
                height="35px"
                bgColor="secondary.pale.500"
                rounded="4px"
                justifyContent="center"
                alignItems="center"
              >
                <Icon as={item.icon} boxSize="20px" color="primary.500" />
              </Flex>
            </Link>
          ))}
        </HStack>
      </VStack>
    </Stack>
  );
};

export default SectionTwo;
