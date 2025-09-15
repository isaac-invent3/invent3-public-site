import { Flex, VStack } from '@chakra-ui/react';
import Overview from './Overview';
import Summary from './Summary';

const AssetInfo = () => {
  return (
    <VStack width="full" spacing={'24px'}>
      <Flex
        width="full"
        px={{ base: '16px', md: '32px' }}
        direction="column"
        gap="32px"
      >
        <Overview />
        <Summary />
      </Flex>
    </VStack>
  );
};

export default AssetInfo;
