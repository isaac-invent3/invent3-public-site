import { Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';
import DetailSection from '~/lib/components/UI/ContentDetails/DetailsSection';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { useAppSelector } from '~/lib/redux/hooks';
import { dateFormatter } from '~/lib/utils/Formatters';

const Summary = ({ failureDate }: { failureDate?: string }) => {
  const { asset: assetData } = useAppSelector((state) => state.asset);

  if (!assetData) {
    return null;
  }

  const {
    assetName,
    assetId,
    healthName,
    riskScoreValue,
    riskScoreName,
    riskScoreColor,
  } = assetData;

  console.log({ assetData });

  const infoOne = [
    {
      label: 'Asset Name:',
      value: assetName ?? 'N/A',
    },
    {
      label: 'Asset ID:',
      value: assetId ?? 'N/A',
    },
    {
      label: 'Health Score:',
      value:
        healthName && riskScoreValue
          ? `${riskScoreValue?.toFixed(2)}% (${riskScoreName} Risk)`
          : 'N/A',
    },
  ];

  return (
    <VStack
      width="full"
      p={6}
      bgColor="#F7F7F7"
      alignItems="flex-start"
      spacing="14px"
    >
      <Text size="lg" fontWeight={700}>
        Asset Summary
      </Text>
      <Stack direction={{ base: 'column', lg: 'row' }} width="full">
        <DetailSection
          details={infoOne}
          labelMinWidth={{ base: '145px', lg: '110px' }}
        />
        <VStack width="full" alignItems="flex-start">
          <Detail
            label="Predicted Failure Date:"
            value={
              failureDate ? dateFormatter(failureDate, 'MMM DD, YYYY') : 'N/A'
            }
            labelMinWidth="145px"
          />
          <Detail
            label="Risk Level Indicator:"
            value={
              <GenericStatusBox
                text={riskScoreName ?? 'N/A'}
                colorCode={riskScoreColor}
              />
            }
            labelMinWidth="145px"
          />
        </VStack>
      </Stack>
    </VStack>
  );
};

export default Summary;
