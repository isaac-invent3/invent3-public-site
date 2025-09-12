import { SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { AssetBoxIcon } from '../../CustomIcons';
import SummaryCardWrapper from '../../Common/SummaryCardWrapper';

const SectionOne = () => {
  const data = [
    {
      label: 'Total Asset',
      value: 108098,
    },
    {
      label: 'Total Asset Managed',
      value: 20000,
    },
    {
      label: 'Asset in Acquisition',
      value: 40000,
    },
    {
      label: 'Asset in Use',
      value: 20805,
    },
    {
      label: 'Asset in Maintenance',
      value: 12500,
      suffix: 'This month',
    },
  ];
  return (
    <SimpleGrid
      width="full"
      columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
      gap="16px"
    >
      {data?.map((item, index) => (
        <SummaryCardWrapper
          title={item.label}
          icon={AssetBoxIcon}
          containerStyle={{ minH: '164px' }}
          //   additionalContent={}
          isLoading={false}
          count={item.value}
          key={index}
        >
          <Text color="blue.500" size="md" fontWeight={700}>
            View Asset
          </Text>
        </SummaryCardWrapper>
      ))}
    </SimpleGrid>
  );
};

export default SectionOne;
