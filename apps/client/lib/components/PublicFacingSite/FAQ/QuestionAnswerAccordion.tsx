import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionProps,
  Icon,
  Text,
} from '@chakra-ui/react';
import { Faqdata } from './data';
import { MinusIcon, PlusIcon } from '../../CustomIcons/layout';

interface QuestionAnswerAccordionProps {
  customAccordionStyles?: AccordionProps;
}

const QuestionAnswerAccordion = ({
  customAccordionStyles,
}: QuestionAnswerAccordionProps) => {
  return (
    <Accordion
      allowMultiple
      width={{ base: 'full', lg: '50%' }}
      {...customAccordionStyles}
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
                  fontWeight={700}
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
  );
};

export default QuestionAnswerAccordion;
