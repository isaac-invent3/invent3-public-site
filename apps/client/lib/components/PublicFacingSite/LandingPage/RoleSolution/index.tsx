import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import Image from 'next/image';
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '~/lib/components/CustomIcons';

const rolesSolutionItems = [
  {
    role: 'For Managers',
    content:
      'Use predictive analytics, cost-saving insights, and compliance tracking to drive long-term business growth and make strategic, data-driven decisions with confidence.',
  },
  {
    role: 'For Field Teams',
    content:
      'Use predictive analytics, cost-saving insights, and compliance tracking to drive long-term business growth and make strategic, data-driven decisions with confidence.',
  },
  {
    role: 'For C-level Executives',
    content:
      'Use predictive analytics, cost-saving insights, and compliance tracking to drive long-term business growth and make strategic, data-driven decisions with confidence.',
  },
];
const RoleSolution = () => {
  const [activeRole, setActiveRole] = useState<null | number>(null);
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="center"
        pt={{ base: '107px', lg: '247px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap="60px"
      >
        <SimpleGrid gap="40px" width="full" columns={{ base: 1, lg: 2 }}>
          <VStack width="full" spacing="60px">
            <Flex direction="column">
              <Text
                py="12px"
                px="16px"
                color="primary.500"
                bgColor="neutral.250"
                rounded="full"
                width="max-content"
              >
                A platform for everyone
              </Text>
              <Heading
                fontWeight={800}
                fontSize={{ base: '24px', md: '40px' }}
                lineHeight={{ base: '28.51px', md: '47.52px' }}
                color="black"
                mt="24px"
              >
                Solutions for{' '}
                <Heading
                  as="span"
                  color="#B279A2"
                  fontWeight={800}
                  fontSize={{ base: '24px', md: '40px' }}
                  lineHeight={{ base: '28.51px', md: '47.52px' }}
                >
                  Every Role{' '}
                </Heading>
                in Your Organization
              </Heading>
              <Text
                fontSize={{ base: '14px', md: '16px' }}
                lineHeight={{ base: '20px', md: '24px' }}
                color="primary.accent"
                fontWeight={400}
                mt="40px"
              >
                Invent3Pro is designed to meet the needs of every
                stakeholder—whether you're leading strategy, managing
                operations, or working in the field. Discover how we empower
                each role.
              </Text>
            </Flex>
            <Accordion allowToggle width="full">
              {rolesSolutionItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  border={`1px solid ${activeRole === index ? '#B279A2' : '#BBBBBB'}`}
                  bgColor={activeRole === index ? '#B279A21A' : 'white'}
                  mb="24px"
                  rounded="16px"
                  pl={{ base: '16px', lg: '40px' }}
                  pt={{ base: '28.5px', lg: '25.5px' }}
                  pb={{ base: '32.5px', lg: '24.5px' }}
                  pr="16px"
                >
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        m={0}
                        p={0}
                        justifyContent="space-between"
                        rounded="4px"
                        borderColor="none"
                        _hover={{ bgColor: 'none' }}
                        onClick={() => setActiveRole(isExpanded ? null : index)}
                      >
                        <Text
                          as="span"
                          color="black"
                          fontSize={{ base: '16px', md: '20px' }}
                          textAlign="left"
                          fontWeight={800}
                        >
                          {item.role}
                        </Text>
                        <Icon
                          boxSize="24px"
                          color="primary.500"
                          as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
                        />
                      </AccordionButton>
                      <AccordionPanel
                        p={0}
                        m={0}
                        mt={{ base: '35px', lg: '30px' }}
                      >
                        <Text
                          color="neutral.600"
                          fontSize={{ base: '14px', md: '16px' }}
                          lineHeight="100%"
                          fontWeight={{ base: 500, lg: 400 }}
                        >
                          {item.content}
                        </Text>
                        <Button
                          customStyles={{
                            mt: { base: '44px', lg: '55px' },
                            width: { base: 'full', lg: '203px' },
                          }}
                        >
                          Request a Free Demo
                        </Button>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </VStack>
          <Flex width="full" height="full" position="relative">
            <Image src="/role-1.png" alt="role" fill />
          </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default RoleSolution;
