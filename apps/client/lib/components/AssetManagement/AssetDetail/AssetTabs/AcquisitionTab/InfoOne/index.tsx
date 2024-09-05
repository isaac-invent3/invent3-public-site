import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import DetailSection from '../../../DetailSection';
import VendorDetails from './VendorDetails';

const InfoOne = () => {
  const details = [
    {
      label: 'Acquisition Date:',
      value: '10th Feb, 2024',
    },
    {
      label: 'Purchase Price:',
      value: 'Latitude 360',
    },
    {
      label: 'Resale Value:',
      value: 'A23570720495730',
    },
    {
      label: 'Scrap Value:',
      value: 'Latitude 360',
    },
    {
      label: 'Condition:',
      value: 'Latitude 360',
    },
  ];
  return (
    <HStack width="full" justifyContent="space-between" spacing="66px">
      <Flex width="max-content">
        <DetailSection minWidth="105px" details={details} />
      </Flex>
      <VendorDetails />
    </HStack>
  );
};

export default InfoOne;
