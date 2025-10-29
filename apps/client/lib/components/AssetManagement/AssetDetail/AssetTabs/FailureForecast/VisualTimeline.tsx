import { Box, Flex, Skeleton, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { AssetForecast } from '~/lib/interfaces/forecast.interfaces';

interface ConfidenceTooltipProps {
  title: string;
  confidence: number;
  direction?: 'up' | 'down'; // arrow direction
}

export const ConfidenceTooltip = ({
  title,
  confidence,
  direction = 'up',
}: ConfidenceTooltipProps) => {
  return (
    <Box position="relative" display="inline-block">
      {/* Tooltip container */}
      <VStack
        border="1px solid #D9D9D9"
        borderRadius="4px"
        py="6px"
        px="8px"
        textAlign="center"
        bg="white"
        spacing="1px"
      >
        <Text fontSize="10px" lineHeight="100%" color="black">
          {title}
        </Text>
        <Text
          fontSize="10px"
          lineHeight="100%"
          color="gray.600"
          fontWeight={400}
        >
          Confidence: {confidence}%
        </Text>
      </VStack>

      {/* Arrow wrapper */}
      <Box
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        {...(direction === 'up' ? { bottom: '100%' } : { top: '100%' })}
      >
        {/* Outer (border) triangle */}
        <Box
          w="0"
          h="0"
          borderLeft="7px solid transparent"
          borderRight="7px solid transparent"
          {...(direction === 'up'
            ? { borderBottom: '7px solid #D9D9D9' }
            : { borderTop: '7px solid #D9D9D9' })}
        />
        {/* Inner (background) triangle */}
        <Box
          position="absolute"
          top={direction === 'up' ? '2px' : undefined}
          bottom={direction === 'down' ? '2px' : undefined}
          left="50%"
          transform="translateX(-50%)"
          w="0"
          h="0"
          borderLeft="6px solid transparent"
          borderRight="6px solid transparent"
          {...(direction === 'up'
            ? { borderBottom: '6px solid white' }
            : { borderTop: '6px solid white' })}
        />
      </Box>
    </Box>
  );
};

interface VisualTimelineProps {
  isLoading: boolean;
  data?: AssetForecast;
}

const VisualTimeline = (props: VisualTimelineProps) => {
  const { data, isLoading } = props;
  const today = moment();
  const start = moment(data?.forecastedLabelStartDate);
  const end = moment(data?.forcastedLabelEndDate);
  const diffStartDays = today.diff(start, 'days');
  const diffEndDays = today.diff(end, 'days');

  return (
    <VStack width="full" alignItems="flex-start" p={2} pb="21px">
      {isLoading && <Skeleton width="full" height="100px" mt="8px" />}

      {!isLoading &&
        data?.forecastedLabelStartDate &&
        data?.forcastedLabelEndDate && (
          <Flex width="full" height="45px" my="56px">
            <Flex flex={1} direction="column" alignItems="center">
              <Text
                minH="20px"
                fontSize="10px"
                lineHeight="100%"
                color="neutral.800"
              >
                {moment().format('MMM D')}
              </Text>
              <Flex
                borderY="1px solid #838383"
                minW="full"
                minH="45px"
                justifyContent="center"
                alignItems="center"
              >
                <Text color="neutral.800" size="md" lineHeight="100%">
                  Today
                </Text>
              </Flex>
            </Flex>
            <Flex
              flex={2}
              direction="column"
              bgColor="#FF382D"
              mt="20px"
              height="45px"
              borderY="1px solid #838383"
              justifyContent="center"
              alignItems="center"
            >
              <Text color="white" size="md" lineHeight="100%" px="8px">
                Expected Failure:{' '}
                {diffStartDays > 0 ? `${diffStartDays} - ${diffEndDays}` : 0}{' '}
                Days
              </Text>
            </Flex>
            <Flex
              flex={1}
              direction="column"
              alignItems="center"
              position="relative"
            >
              <Flex
                minH="20px"
                width="full"
                justifyContent="space-between"
                position="relative"
              >
                <Text
                  fontSize="10px"
                  lineHeight="100%"
                  color="neutral.800"
                  position="relative"
                  left="-15px"
                >
                  {start.format('MMM D')}
                </Text>
                <Text
                  fontSize="10px"
                  lineHeight="100%"
                  color="neutral.800"
                  position="relative"
                  right="-15px"
                >
                  {end.format('MMM D')}
                </Text>
              </Flex>
              <Flex
                position="relative"
                borderY="1px solid #838383"
                minW="full"
                minH="45px"
                justifyContent="center"
                alignItems="center"
                bgColor="#99211B"
              >
                {/* Top Left Marker */}
                <Box position="absolute" top="-5px" left="-5px">
                  <Box
                    w="8px"
                    h="8px"
                    borderRadius="full"
                    border="1px solid white"
                    bg="#FF382D"
                    mx="auto"
                  />
                </Box>
                <Box position="absolute" top="-70px" left="-62px">
                  <ConfidenceTooltip
                    title={`Forecast Start: Day ${diffStartDays}`}
                    confidence={82}
                    direction="down"
                  />
                </Box>

                {/* Bottom Right Marker */}
                <Box position="absolute" bottom="-5px" right="-5px">
                  <Box
                    w="8px"
                    h="8px"
                    borderRadius="full"
                    border="1px solid white"
                    bg="#FF382D"
                    mx="auto"
                  />
                </Box>
                <Box position="absolute" bottom="-55px" right="-55px">
                  <ConfidenceTooltip
                    title={`Forecast End: Day ${diffEndDays}`}
                    confidence={82}
                    direction="up"
                  />
                </Box>
              </Flex>
            </Flex>
            <Flex
              flex={2}
              direction="column"
              bgColor="#FF382D"
              mt="20px"
              height="45px"
              borderY="1px solid #838383"
            />
          </Flex>
        )}
      {!isLoading &&
        (data?.forecastedLabelStartDate ||
          data?.forcastedLabelEndDate ||
          !data) && (
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
  );
};

export default VisualTimeline;
