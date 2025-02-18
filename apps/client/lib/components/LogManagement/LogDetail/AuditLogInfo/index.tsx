import { Flex, VStack } from '@chakra-ui/react';
import Overview from './Overview';
import ChangedData from './ChangedData';

const AuditLogInfo = () => {
  return (
    <VStack width="full" spacing={{ base: '16px', lg: '32px' }}>
      <Overview />
      <Flex width="full" px={{ base: '16px', lg: '32px' }}>
        <ChangedData />
      </Flex>
    </VStack>
  );
};

export default AuditLogInfo;
