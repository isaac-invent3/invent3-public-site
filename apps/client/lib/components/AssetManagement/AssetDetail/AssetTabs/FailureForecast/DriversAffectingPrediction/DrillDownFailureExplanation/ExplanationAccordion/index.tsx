import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Icon,
  Text,
  HStack,
  AccordionPanel,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '~/lib/components/CustomIcons';
import InsightRecommendations from './InsightRecommendations';
import FailureProbabilitySummary from './FailureProbabilitySummary';
import FactorInfluenceBreakdown from './FactorInfluenceBreakdown';
import SensorDataPattern from './SensorDataPattern';
import { AssetForecast } from '~/lib/interfaces/forecast.interfaces';

const ExplanationAccordion = ({
  assetForcast,
}: {
  assetForcast?: AssetForecast;
}) => {
  const info = [
    {
      label: 'Factor Influence Breakdown',
      details: <FactorInfluenceBreakdown assetForcast={assetForcast} />,
    },
    {
      label: 'Sensor Data Patterns',
      details: <SensorDataPattern />,
    },
    {
      label: 'Failure Probability Summary',
      details: <FailureProbabilitySummary />,
    },
    {
      label: 'Insights & Recommendations',
      details: <InsightRecommendations />,
    },
  ];

  return (
    <Accordion width="full" px="24px" allowToggle>
      {info.map((item, index) => (
        <AccordionItem
          bgColor="white"
          p={0}
          overflow="hidden"
          border="none"
          width="full"
          key={index}
        >
          {({ isExpanded }) => (
            <>
              <AccordionButton
                p={0}
                _hover={{ bgColor: 'none' }}
                borderBottomWidth="1px"
                borderColor="#BBBBBB !important"
              >
                <HStack
                  width="full"
                  justifyContent="space-between"
                  bgColor={isExpanded ? '#9B9B9B33' : '#9B9B9B1A'}
                  py="12px"
                  px="16px"
                >
                  <Text
                    size="md"
                    fontWeight={isExpanded ? 700 : 500}
                    lineHeight="100%"
                    color="neutral.800"
                  >
                    {item.label}
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
                    boxSize="24px"
                    color="neutral.800"
                  />
                </HStack>
              </AccordionButton>
              <AccordionPanel p="8px" bgColor="white">
                {item.details}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ExplanationAccordion;
