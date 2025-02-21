import { Flex, HStack } from '@chakra-ui/react';
import UserActivity from '../../Common/Table/UserActivity';
import VendorManagement from './VendorManagement';

const SectionFive = () => {
  return (
    <HStack
      spacing="16px"
      width="full"
      minH={{ md: '382px' }}
      flexDir={{ base: 'column', md: 'row' }}
    >
      <Flex
        width={{ base: 'full', md: '54%' }}
        height="full"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <VendorManagement />
      </Flex>
      <Flex
        width={{ base: 'full', md: '45%' }}
        height="full"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <UserActivity />
      </Flex>
    </HStack>
  );
};

export default SectionFive;
