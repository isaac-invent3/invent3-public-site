import { Text, VStack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import SectionWrapper from '~/lib/components/UserSettings/Common/SectionWrapper';
import APIKeys from './APIKeys';
import APIKeyModal from './APIKeys/APIKeyModal';
import Webhooks from './Webhooks';

const APIWebhook = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <VStack spacing="24px" width="full" alignItems="flex-start">
        <Text fontWeight={700} size="lg">
          API & Webhooks
        </Text>
        <VStack width="full" spacing="32px" alignItems="flex-start">
          <VStack width="full" spacing="32px">
            <SectionWrapper
              title="Generate New API Key"
              subtitle="Create secure access with ease"
              sectionInfoWidth="212px"
              sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
            >
              <Button
                customStyles={{ width: '121px', height: '36px' }}
                handleClick={onOpen}
              >
                Generate Key
              </Button>
            </SectionWrapper>
            <APIKeys />
            <Webhooks />
          </VStack>
        </VStack>
      </VStack>
      <APIKeyModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default APIWebhook;
