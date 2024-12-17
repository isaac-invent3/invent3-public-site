import { Flex, HStack, Text, VStack } from '@chakra-ui/react';

import CurrentOwner from './CurrentOwner';
import AssetDetails from '../../Common/AssetDetail';
import { useAppSelector } from '~/lib/redux/hooks';

const SectionOne = () => {
  const { assetLocation, currentCondition } = useAppSelector(
    (state) => state.asset.asset
  );
  return (
    <Flex gap="44px" width="full">
      <Flex width="40%">
        <CurrentOwner />
      </Flex>
      <Flex width="60%">
        <AssetDetails stackType="column" showStatus={false}>
          <HStack alignItems="flex-start" spacing="56px">
            <HStack alignItems="flex-start" spacing="24px">
              <Text color="neutral.600" size="md">
                Location:
              </Text>
              <Text color="black" size="md" lineHeight="22px">
                {assetLocation ?? 'N/A'}
              </Text>
            </HStack>
            <VStack spacing="8px" alignItems="flex-start">
              <Text color="neutral.600" size="md">
                Condition:
              </Text>
              <Text color="black" size="md" lineHeight="22px">
                {currentCondition ?? 'N/A'}
              </Text>
            </VStack>
          </HStack>
        </AssetDetails>
      </Flex>
    </Flex>
  );
};

export default SectionOne;
