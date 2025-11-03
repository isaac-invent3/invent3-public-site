import {
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { AssetForecast } from '~/lib/interfaces/forecast.interfaces';
import DrillDownFailureExplanation from './DriversAffectingPrediction/DrillDownFailureExplanation';

interface DriversAffectingPredictionProps {
  isLoading: boolean;
  data?: AssetForecast;
}

const DriversAffectingPrediction = (props: DriversAffectingPredictionProps) => {
  const { data, isLoading } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack width="full" spacing="12px" alignItems="flex-start">
        <DetailHeader variant="secondary">
          Top Drivers Affecting Prediction
        </DetailHeader>
        {isLoading && <Skeleton width="full" height="100px" />}
        {!isLoading &&
          data?.forecastDrivers &&
          data?.forecastDrivers?.length > 0 && (
            <VStack width="full" spacing="12px" alignItems="flex-start">
              <UnorderedList
                spacing="8px"
                width="full"
                alignItems="flex-start"
                pl="8px"
              >
                {data?.forecastDrivers?.map((item, index) => (
                  <ListItem
                    key={index}
                    color="black"
                    fontSize="14px"
                    fontWeight={500}
                    lineHeight="100%"
                  >
                    <Detail
                      label={item?.driverFeature!}
                      value={item?.description}
                      labelMinWidth="90px"
                      labelStyle={{ color: 'black' }}
                    />
                  </ListItem>
                ))}
              </UnorderedList>
              <Text
                color="blue.500"
                mt="18px"
                cursor="pointer"
                onClick={onOpen}
              >
                View Drill-Down Failure Explanation
              </Text>
            </VStack>
          )}
        <Text color="blue.500" mt="18px" cursor="pointer" onClick={onOpen}>
          View Drill-Down Failure Explanation
        </Text>
        {!isLoading &&
          (data?.forecastDrivers?.length === 0 || !data?.forecastDrivers) && (
            <Text
              fontStyle="italic"
              color="neutral.300"
              width="full"
              textAlign="center"
              size="md"
              my={8}
            >
              No Data at the moment
            </Text>
          )}
      </VStack>
      <DrillDownFailureExplanation
        isOpen={isOpen}
        onClose={onClose}
        assetForcast={data}
      />
    </>
  );
};

export default DriversAffectingPrediction;
