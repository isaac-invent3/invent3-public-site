import { SimpleGrid, VStack } from '@chakra-ui/react';

import AssetField from './Asset';
import AssetSchedules from './AssetSchedules';
import TaskTitle from '../../Common/TaskTitle';

const SectionOne = () => {
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        alignItems="flex-start"
        width="full"
        spacing={{ base: '30px', md: '78px' }}
      >
        <TaskTitle sectionMaxWidth="141px" spacing="47px" />
        <AssetField />
      </SimpleGrid>
      <AssetSchedules />
    </VStack>
  );
};

export default SectionOne;
