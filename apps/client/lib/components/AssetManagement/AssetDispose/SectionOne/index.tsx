import { Box, HStack, VStack } from '@chakra-ui/react';

import AssetDetails from '../../Common/AssetDetail';
import { Button } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';

const SectionOne = () => {
  const { assetId } = useAppSelector((state) => state.asset.asset);
  return (
    <HStack width="full" spacing="24px" justifyContent="space-between">
      <Box width="full" maxW="70%">
        <AssetDetails
          stackType="row"
          showStatus={true}
          customStyle={{ width: 'max-content' }}
        />
      </Box>
      <VStack spacing="16px">
        <Button customStyles={{ widht: '203px', height: '42px' }}>
          View Maintenance History
        </Button>
        <Button
          customStyles={{ widht: '203px', height: '42px' }}
          variant="outline"
          href={`/asset-management?asset=${assetId}`}
        >
          View Full Asset Details
        </Button>
      </VStack>
    </HStack>
  );
};

export default SectionOne;
