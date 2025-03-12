import { Flex, VStack } from '@chakra-ui/react';
import Overview from './Overview';
import Summary from './Summary';

const UserInfo = () => {
  return (
    <VStack width="full" spacing="24px">
      <Overview />
      <Flex width="full" px={{ base: '16px', md: '32px' }}>
        <Summary />
      </Flex>
    </VStack>
  );
};

export default UserInfo;
