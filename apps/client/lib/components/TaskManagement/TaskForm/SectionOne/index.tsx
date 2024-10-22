import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import AssetField from './Asset';
import { useAppSelector } from '~/lib/redux/hooks';
import AssetLocation from '~/lib/components/Common/AssetLocation';
import AssetSchedules from './AssetSchedules';

const SectionOne = () => {
  const { assetLocation } = useAppSelector((state) => state.task.taskForm);
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="78px"
      >
        <AssetField />
        <AssetLocation value={assetLocation} />
      </SimpleGrid>
      <AssetSchedules />
    </VStack>
  );
};

export default SectionOne;
