import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import AssetDepreciation from './AssetDepreciation';
import ApprovalRequests from './Approval';

const SectionFive = () => {
  return (
    <SimpleGrid width="full" gap="16px" columns={2}>
      <AssetDepreciation />
      <ApprovalRequests />
    </SimpleGrid>
  );
};

export default SectionFive;
