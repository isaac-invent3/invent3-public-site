import { Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
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
    <VStack spacing="16px" alignItems="flex-start">
      <VStack width="full" spacing="8px" alignItems="flex-start">
        <Text size="lg" color="black">
          Follow us on
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
      {contactInfo.map((item, index) => (
        <Text key={index} color="primary.500" size="lg">
          {item}
        </Text>
      ))}
    </VStack>
  );
};

export default SectionTwo;
