import {
  HStack,
  Icon,
  Text,
  VStack,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Button } from '@repo/ui/components';
import SectionWrapper from '~/lib/components/UserSettings/Common/SectionWrapper';
import { useGetCompanyApiKeyQuery } from '~/lib/redux/services/company.services';
import { useSession } from 'next-auth/react';
import { CopyIcon } from '@chakra-ui/icons';

const APIWebhook = () => {
  const session = useSession();
  const [loadApikey, setLoadApikey] = useState(false);
  const { data, isLoading, isFetching } = useGetCompanyApiKeyQuery(
    {
      companyId: session?.data?.user?.companyId!,
      requestedBy: session?.data?.user?.username!,
    },
    { skip: !loadApikey }
  );
  const { onCopy, value, setValue, hasCopied } = useClipboard('');
  const toast = useToast();

  useEffect(() => {
    if (data?.data?.apiKey) {
      setValue(data?.data?.apiKey);
    }
    setLoadApikey(false);
  }, [data]);

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: 'Success',
        description: 'API Key Copied Successfully',
        status: 'success',
        position: 'top-right',
        duration: 2000,
      });
    }
  }, [hasCopied]);

  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        API & Webhooks
      </Text>
      <VStack width="full" spacing="16px" alignItems="flex-start">
        <VStack width="full" spacing="16px">
          <SectionWrapper
            title="Generate New API Key"
            subtitle="Create secure access with ease"
            sectionInfoWidth="212px"
            sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
          >
            <Button
              customStyles={{ width: '121px', height: '36px' }}
              isLoading={isLoading || isFetching}
              loadingText="Generating"
              handleClick={() => setLoadApikey(true)}
            >
              Generate Key
            </Button>
          </SectionWrapper>
        </VStack>
        {data?.data?.apiKey && !isLoading && !isFetching && (
          <HStack>
            <Text size="md">
              Your Key is:{' '}
              <Text as="span" size="md" fontWeight={700}>
                {data?.data?.apiKey}
              </Text>
            </Text>
            <Icon
              as={CopyIcon}
              boxSize="16px"
              onClick={onCopy}
              cursor="pointer"
            />
          </HStack>
        )}
      </VStack>
    </VStack>
  );
};

export default APIWebhook;
