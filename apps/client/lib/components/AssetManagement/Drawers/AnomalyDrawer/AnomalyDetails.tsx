import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';
import { BMSAnomaly } from '~/lib/interfaces/dashboard/bms.interfaces';

interface AnomalyDetailProps {
  anomaly?: BMSAnomaly;
}
const AnomalyDetail = ({ anomaly }: AnomalyDetailProps) => {
  const details = [
    {
      label: 'Parameter:',
      value: anomaly?.subCategoryName ?? 'N/A',
    },
    {
      label: 'Observed Value:',
      value:
        anomaly?.actualReadingValue !== undefined &&
        anomaly?.unitAlias !== undefined
          ? `${anomaly.actualReadingValue}${anomaly.unitAlias}`
          : 'N/A',
    },
    {
      label: 'Expected Range:',
      value:
        anomaly?.baselineValue !== undefined && anomaly?.unitAlias !== undefined
          ? `${anomaly.baselineValue}${anomaly.unitAlias}`
          : 'N/A',
    },
    {
      label: 'Deviation',
      value:
        anomaly?.deviation !== undefined
          ? `${anomaly.deviation}% above baseline`
          : 'N/A',
    },
  ];
  return (
    <>
      <VStack spacing="16px" width="full" alignItems="flex-start">
        <Text color="neutral.600" fontWeight={700}>
          Anomaly Details
        </Text>
        <VStack spacing="8px" width="full" alignItems="flex-start">
          {details.map((detail) => (
            <Detail
              key={detail.label}
              label={detail.label}
              value={detail.value}
              labelStyle={{ color: 'neutral.700' }}
              valueStyle={{ fontWeight: 800 }}
              labelMinWidth={'110px'}
            />
          ))}
          <Detail
            label="Severity:"
            value={anomaly?.severityName ?? 'N/A'}
            labelStyle={{ color: 'neutral.700' }}
            valueStyle={{ fontWeight: 800, color: anomaly?.severityColorCode }}
            labelMinWidth={'110px'}
          />
        </VStack>
      </VStack>
    </>
  );
};

export default AnomalyDetail;
