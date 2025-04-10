import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Icon,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../../CustomIcons';
import { Button } from '@repo/ui/components';

interface AccordionFeatureProps {
  items: { title: string; content: string }[];
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  showButton: boolean;
}
const AccordionFeature = (props: AccordionFeatureProps) => {
  const { items, activeIndex, setActiveIndex, showButton } = props;
  return (
    <Accordion allowToggle width="full">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          border={`1px solid ${activeIndex === index ? '#B279A2' : '#BBBBBB'}`}
          bgColor={activeIndex === index ? '#B279A21A' : 'white'}
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
                onClick={() => setActiveIndex(isExpanded ? null : index)}
              >
                <Text
                  as="span"
                  color="black"
                  fontSize={{ base: '16px', md: '20px' }}
                  textAlign="left"
                  fontWeight={800}
                >
                  {item.title}
                </Text>
                <Icon
                  boxSize="24px"
                  color="primary.500"
                  as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
                />
              </AccordionButton>
              <AccordionPanel p={0} m={0} mt={{ base: '35px', lg: '30px' }}>
                <Text
                  color="neutral.600"
                  fontSize={{ base: '14px', md: '16px' }}
                  lineHeight="100%"
                  fontWeight={{ base: 500, lg: 400 }}
                >
                  {item.content}
                </Text>
                {showButton && (
                  <Button
                    customStyles={{
                      mt: { base: '44px', lg: '55px' },
                      width: { base: 'full', lg: '203px' },
                    }}
                  >
                    Request a Free Demo
                  </Button>
                )}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionFeature;
