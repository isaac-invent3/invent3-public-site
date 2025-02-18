import { Flex } from '@chakra-ui/react';
import EmployeeInfo from './EmployeeInfo';
import RoleGroupInfo from './RoleGroupInfo';

const SectionTwo = () => {
  return (
    <Flex
      width="full"
      gap={{ base: '40px', lg: '57px' }}
      direction={{ base: 'column', lg: 'row' }}
      justifyContent="space-between"
    >
      <Flex width={{ base: 'full', lg: '563px' }}>
        <EmployeeInfo />
      </Flex>
      <Flex width={{ base: 'full', lg: '440px' }}>
        <RoleGroupInfo />
      </Flex>
    </Flex>
  );
};

export default SectionTwo;
