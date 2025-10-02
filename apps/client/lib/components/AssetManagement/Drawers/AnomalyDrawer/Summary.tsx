import { HStack, Icon, Text, Tooltip, VStack } from '@chakra-ui/react';
import React from 'react';
import { InfoIcon } from '~/lib/components/CustomIcons';
import Detail from '~/lib/components/UI/ContentDetails/Detail';
import { BMSAnomaly } from '~/lib/interfaces/dashboard/bms.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';

interface SummaryProps {
  anomaly?: BMSAnomaly;
}
const Summary = ({ anomaly }: SummaryProps) => {
  return (
    <>
      <VStack spacing="16px" width="full" alignItems="flex-start">
        <Text color="neutral.600" fontWeight={700}>
          Summary
        </Text>
        <VStack spacing="8px" width="full" alignItems="flex-start">
          <Detail
            label="Status:"
            value={anomaly?.statusName ?? 'N/A'}
            labelStyle={{ color: 'neutral.700' }}
            valueStyle={{ fontWeight: 800, color: anomaly?.displayColorCode }}
            labelMinWidth="80px"
          />
          <Detail
            label="Detected On:"
            value={
              anomaly?.dateDetected
                ? dateFormatter(anomaly?.dateDetected, 'MMM D, YYYY, HH:mm A')
                : 'N/A'
            }
            labelStyle={{ color: 'neutral.700' }}
            valueStyle={{ fontWeight: 800 }}
            labelMinWidth="80px"
          />
          {/* <HStack spacing="16px" width="full">
            <Detail
              label="Confidence:"
              value={anomaly?.anomalyId ?? 'N/A'}
              labelStyle={{ color: 'neutral.700' }}
              valueStyle={{ fontWeight: 800 }}
              labelMinWidth="80px"
            />
            <Tooltip
              label="Confidence reflects model accuracy and data completeness."
              placement="top"
              bgColor="black"
              color="white"
              minW="190px"
              rounded="10px"
              padding="6px"
              fontSize="12px"
            >
              <HStack
                width="12px"
                height="12px"
                justifyContent="center"
                flexShrink={0}
              >
                <Icon as={InfoIcon} boxSize="12px" color="blue.500" />
              </HStack>
            </Tooltip>
          </HStack> */}
        </VStack>
      </VStack>
    </>
  );
};

export default Summary;
