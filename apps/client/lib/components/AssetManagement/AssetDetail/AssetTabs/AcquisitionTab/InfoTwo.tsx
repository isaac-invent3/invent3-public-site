import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import DetailSection from '../../DetailSection';

const InfoTwo = () => {
  const details1 = [
    {
      label: 'Start Date:',
      value: '10th Feb, 2024',
    },
    {
      label: 'End Date:',
      value: '10th Feb, 2024 360',
    },
    {
      label: 'Warranty Terms:',
      value: '2 years for all IT equipment',
    },
  ];

  const details2 = [
    {
      label: 'Depreciation Start Date:',
      value: '10th Feb, 2024',
    },
    {
      label: 'Depreciation Method:',
      value: 'Straight-line',
    },
    {
      label: 'Depreciation Rate:',
      value: '10%',
    },
  ];

  return (
    <HStack width="full" alignItems="flex-start" spacing="118px">
      <Flex width="max-content">
        <DetailSection
          details={details1}
          minWidth="103px"
          header="Warranty Details"
        />
      </Flex>
      <Flex width="max-content">
        <DetailSection
          details={details2}
          minWidth="151px"
          header="Depreciation Details"
        />
      </Flex>
    </HStack>
  );
};

export default InfoTwo;
