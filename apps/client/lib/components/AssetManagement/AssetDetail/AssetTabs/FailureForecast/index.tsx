import {
  SimpleGrid,
  VStack,
  Accordion,
  AccordionButton,
  AccordionItem,
  Icon,
  Text,
  HStack,
  AccordionPanel,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '~/lib/components/CustomIcons';
import Forecast from './Forecast';
import DriversAffectingPrediction from './DriversAffectingPrediction';
import VisualTimeline from './VisualTimeline';
import { useAppSelector } from '~/lib/redux/hooks';
import { FORECAST_TYPE_ENUM } from '~/lib/utils/constants';
import { useGetAssetForecastQuery } from '~/lib/redux/services/forecast.services';
import SuggestedSpareParts from './SuggestedSpareParts';
import RetirementForecasts from './RetirementForecasts';

const FailureForecast = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }
  const { assetId } = assetData;
  const { data, isLoading } = useGetAssetForecastQuery({
    assetId,
    forecastType: FORECAST_TYPE_ENUM.FAILURE,
  });

  const info = [
    {
      label: 'Visual Timeline',
      details: <VisualTimeline isLoading={isLoading} data={data?.data} />,
    },
    {
      label: 'Suggested Spare Parts',
      details: <SuggestedSpareParts isLoading={isLoading} data={data?.data} />,
    },
    {
      label: 'Retirement Forecasts',
      details: <RetirementForecasts isLoading={isLoading} data={data?.data} />,
    },
  ];

  return (
    <VStack
      width="full"
      spacing={{ base: '16px', md: '32px' }}
      my="24px"
      bgColor="white"
      p={{ base: '16px' }}
      rounded="8px"
    >
      <SimpleGrid width="full" spacing="40px" columns={{ base: 1, lg: 2 }}>
        <Forecast isLoading={isLoading} data={data?.data} />
        <DriversAffectingPrediction isLoading={isLoading} data={data?.data} />
      </SimpleGrid>
      <Accordion width="full" allowToggle>
        {info.map((item, index) => (
          <AccordionItem
            bgColor="#F7F7F7"
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
                <AccordionPanel p="8px">{item.details}</AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  );
};

export default FailureForecast;
