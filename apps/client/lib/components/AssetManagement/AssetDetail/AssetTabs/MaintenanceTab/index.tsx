import { Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import { maintenanceData } from '~/lib/utils/MockData/maintenance';
import MaintenanceCard from './MaintenanceCard';

const MaintenanceTab = () => {
  return (
    <Flex
      width="full"
      alignItems="flex-end"
      gap="16px"
      direction="column"
      my="16px"
    >
      <Button
        customStyles={{ width: 'min-content', minH: '28px' }}
        variant="secondary"
      >
        Edit Maintenance Schedule
      </Button>
      <VStack width="full" spacing="16px">
        {maintenanceData.map((item) => (
          <MaintenanceCard {...item} key={item.description.id} />
        ))}
      </VStack>
    </Flex>
  );
};

export default MaintenanceTab;
