import { SimpleGrid } from '@chakra-ui/react';
import UserActivity from '../../Common/Table/UserActivity';
import CompanyManagement from './CompanyManagement';

const SectionThree = () => {
  return (
    <SimpleGrid
      spacing="16px"
      width="full"
      minH="409px"
      columns={{ base: 1, lg: 2 }}
    >
      <CompanyManagement />
      <UserActivity />
    </SimpleGrid>
  );
};

export default SectionThree;
