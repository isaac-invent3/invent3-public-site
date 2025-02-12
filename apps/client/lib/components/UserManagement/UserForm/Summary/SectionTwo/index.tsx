import { SimpleGrid } from '@chakra-ui/react';
import EmployeeInfo from './EmployeeInfo';
import OccupationInfo from './OccupationInfo';

const SectionTwo = () => {
  return (
    <SimpleGrid width="full" columns={{ base: 1, md: 2 }} gap="57px">
      <EmployeeInfo />
      <OccupationInfo />
    </SimpleGrid>
  );
};

export default SectionTwo;
