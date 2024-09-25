import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import CurrentOwner from './CurrentOwner';
import AssetDetails from './AssetDetails';
import Button from '~/lib/components/UI/Button';
import { useAppSelector } from '~/lib/redux/hooks';

const SectionOne = () => {
  const { assetId } = useAppSelector((state) => state.asset.asset);
  return (
    <Flex gap="112px" width="full">
      <Flex width="40%">
        <CurrentOwner />
      </Flex>
      <Flex width="60%">
        <HStack width="full" alignItems="flex-end" spacing="45px">
          <Flex width="70%">
            <AssetDetails />
          </Flex>
          <Button
            variant="secondary"
            customStyles={{
              height: '28px',
              width: 'max-content',
              paddingX: '12px',
            }}
            href={`/asset-management?asset=${assetId}`}
          >
            View Full Asset Details
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default SectionOne;
