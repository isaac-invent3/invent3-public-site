import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { clientSideBarData } from '~/lib/layout/ProtectedPage/SideBar/utils';
import Module from './Module';

const CompanyModules = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
      gap="16px"
      bgColor="white"
      rounded={{ base: '8px', lg: '16px' }}
      p={{ base: '16px', lg: '40px' }}
    >
      {clientSideBarData.map((item, index) => (
        <Module
          key={index}
          name={item.name}
          route={item.route}
          icon={item.icon}
          description={item.description ?? ''}
        />
      ))}
    </SimpleGrid>
  );
};

export default CompanyModules;
