import { SimpleGrid, VStack } from '@chakra-ui/react';

import Asset from './Asset';
import AssetLocation from '../../../../../Common/AssetLocation';
import MaintenancePlan from './MaintenancePlan';
import { useAppSelector } from '~/lib/redux/hooks';

const SectionOne = () => {
  const { assetLocation } = useAppSelector(
    (state) => state.maintenance.scheduleForm
  );
  return (
    <VStack spacing="45px" width="full" alignItems="flex-start">
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="40px"
      >
        <Asset />
        <AssetLocation value={assetLocation} />
      </SimpleGrid>

      <MaintenancePlan />
    </VStack>
  );
};

export default SectionOne;
