import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Faqdata } from './data';
import { MinusIcon, PlusIcon } from '../../CustomIcons/layout';

const FaqAccordion = () => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        py={{ base: '40px', lg: '120px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', lg: 'row' }}
        gap="24px"
      >
        <VStack
          alignItems="flex-start"
          maxW="516px"
          width={{ base: 'full', lg: '43%' }}
          spacing="16px"
        >
          <Heading
            fontWeight={800}
            fontSize={{ base: '24px', md: '40px' }}
            lineHeight={{ base: '28.51px', md: '47.52px' }}
            color="primary.500"
          >
            Frequently Asked Questions
          </Heading>
          <Text
            fontSize={{ base: '14px', md: '16px' }}
            lineHeight={{ base: '20px', md: '24px' }}
            color="neutral.600"
            fontWeight={400}
          >
            Find answers to common questions about Invent3, including asset
            management, maintenance scheduling, cost optimization, compliance
            tracking, and reporting features.
          </Text>
        </VStack>

        <Accordion
          defaultIndex={[0]}
          allowMultiple
          width={{ base: 'full', lg: '57%' }}
        >
          {Faqdata.map((item, index) => (
            <AccordionItem key={index} border="none" mb="24px">
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    m={0}
                    p="16px"
                    justifyContent="space-between"
                    rounded="4px"
                    borderColor="none"
                    _hover={{ bgColor: 'none' }}
                    bgColor="#CCCCCC1A"
                  >
                    <Text
                      as="span"
                      maxW="80%"
                      color="primary.500"
                      size={{ base: 'base', md: 'lg' }}
                      textAlign="left"
                    >
                      {item.question}
                    </Text>
                    <Icon
                      boxSize="24px"
                      color="primary.500"
                      as={isExpanded ? MinusIcon : PlusIcon}
                    />
                  </AccordionButton>
                  <AccordionPanel p={0} m={0} mt="16px" px="16px">
                    <Text color="neutral.800" size={{ base: 'base', md: 'md' }}>
                      {item.answer}
                    </Text>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </Flex>
  );
};

export default FaqAccordion;
