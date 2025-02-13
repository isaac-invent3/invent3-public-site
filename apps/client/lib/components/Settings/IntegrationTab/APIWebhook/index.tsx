import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import SectionWrapper from '~/lib/components/Profile/Common/SectionWrapper';

const APIWebhook = () => {
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        API & Webhooks
      </Text>
      <VStack width="full" spacing="16px">
        <SectionWrapper
          title="Generate New API Key"
          subtitle="Create secure access with ease"
          sectionInfoWidth="212px"
          sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
        >
          <Button customStyles={{ width: '121px', height: '36px' }}>
            Generate Key
          </Button>
        </SectionWrapper>
      </VStack>
    </VStack>
  );
};

export default APIWebhook;
