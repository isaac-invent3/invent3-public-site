import { Flex, VStack } from '@chakra-ui/react';
import Overview from './Overview';
import ChangedData from './ChangedData';

const AuditLogInfo = () => {
  return (
    <VStack width="full" spacing="32px">
      <Overview />
      <Flex width="full" px="32px">
        <ChangedData />
      </Flex>
    </VStack>
  );
};

export default AuditLogInfo;
