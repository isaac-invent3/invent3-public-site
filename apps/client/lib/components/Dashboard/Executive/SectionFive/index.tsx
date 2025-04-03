import { SimpleGrid } from '@chakra-ui/react';
import ApprovalRequests from './Approval';
import AssetDepreciation from './AssetDepreciation';

const SectionFive = () => {
  return (
    <SimpleGrid
      width="full"
      gap="16px"
      columns={{ base: 1, lg: 2 }}
      minH="353px"
    >
      <AssetDepreciation />
      <ApprovalRequests />
    </SimpleGrid>
  );
};

export default SectionFive;
