import { Flex, HStack, Stack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import Link from 'next/link';

const extraLinks = [
  {
    label: 'Terms & Condition',
    link: '/terms',
  },
  {
    label: 'Privacy Policy',
    link: '/privacy-policy',
  },
];

const Footer = () => {
  return (
    <Flex bgColor="white" justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="center"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        pt={{ base: '43px', lg: '73px' }}
        pb={{ base: '23px', lg: '25px' }}
        maxW="1440px"
        direction="column"
      >
        <Flex
          width="full"
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
          pb={{ base: '16px', md: '40px', lg: '158px' }}
          borderBottom="1px solid #BBBBBB"
          mb={{ base: '16px', md: '24px' }}
          alignItems="flex-start"
          gap="24px"
        >
          <Flex width={{ base: 'full', lg: '75%' }}>
            <SectionOne />
          </Flex>
          <Flex
            width={{ base: 'full', lg: '25%' }}
            justifyContent={{ lg: 'flex-end' }}
          >
            <SectionTwo />
          </Flex>
        </Flex>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing="8px"
          width="full"
        >
          <Text fontWeight={400}>
            &copy; {new Date().getFullYear()}, All Rights Reserved{' '}
          </Text>
          <HStack spacing="8px" divider={<StackDivider borderColor="black" />}>
            {extraLinks.map((item, index) => (
              <Link href={item.link} key={index}>
                <Text fontWeight={400}>{item.label}</Text>
              </Link>
            ))}
          </HStack>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Footer;
