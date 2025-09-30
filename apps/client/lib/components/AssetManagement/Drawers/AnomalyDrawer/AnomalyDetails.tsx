import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';
import { Prediction } from '~/lib/interfaces/prediction.interfaces';

interface AnomalyDetailProps {
  prediction?: Prediction;
  isLoading: boolean;
}
const AnomalyDetail = ({ prediction, isLoading }: AnomalyDetailProps) => {
  const details = [
    {
      label: 'Parameter:',
      value: 'Vibration',
    },
    {
      label: 'Observed Value:',
      value: '35Hz',
    },
    {
      label: 'Expected Range:',
      value: '20-25 Hz',
    },
    {
      label: 'Deviation',
      value: '+40% above baseline',
    },
  ];
  return (
    <>
      <VStack spacing="16px" width="full" alignItems="flex-start">
        <Text color="neutral.600" fontWeight={700}>
          AnomalyDetail Details
        </Text>
        <VStack spacing="8px" width="full" alignItems="flex-start">
          {details.map((detail) => (
            <Detail
              key={detail.label}
              label={detail.label}
              value={detail.value}
              labelStyle={{ color: 'neutral.700' }}
              valueStyle={{ fontWeight: 800 }}
              isLoading={isLoading}
              labelMinWidth={'130px'}
            />
          ))}
          <Detail
            label="Severity:"
            value={prediction?.riskScore ? `${prediction?.riskScore}%` : 'N/A'}
            labelStyle={{ color: 'neutral.700' }}
            valueStyle={{ fontWeight: 800 }}
            labelMinWidth={'130px'}
          />
        </VStack>
      </VStack>
    </>
  );
};

export default AnomalyDetail;
