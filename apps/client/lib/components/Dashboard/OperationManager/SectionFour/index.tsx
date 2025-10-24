import { Flex } from '@chakra-ui/react';

import RecentAsset from './RecentAsset';
import AssetCategoryRiskScore from './AssetCategoryRiskScore';

const SectionFour = () => {
  return (
    <Flex
      width="full"
      gap={{ base: '16px', md: 0 }}
      direction={{ base: 'column', md: 'row' }}
      px={{ base: '16px', md: 0 }}
    >
      <Flex width="full" maxW={{ md: 'calc(100% - 354px)' }}>
        <RecentAsset />
      </Flex>
      <Flex width={{ base: 'full', md: '354px' }} pl={{ md: '16px' }}>
        <AssetCategoryRiskScore />
      </Flex>
    </Flex>
  );
};

export default SectionFour;
