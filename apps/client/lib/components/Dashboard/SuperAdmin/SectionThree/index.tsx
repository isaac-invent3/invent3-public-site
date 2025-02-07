import { SimpleGrid } from '@chakra-ui/react';
import UserActivity from '../../ClientAdmin/SectionFive/UserActivity';
import CompanyManagement from './CompanyManagement';

const SectionThree = () => {
  return (
    <SimpleGrid
      spacing="16px"
      width="full"
      minH="409px"
      columns={{ base: 1, md: 2 }}
    >
      <CompanyManagement />
      <UserActivity />
    </SimpleGrid>
  );
};

export default SectionThree;
