import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

const Email = () => {
  const data = useSession();
  return (
    <SectionWrapper
      title="Email Address"
      subtitle="The email address associated with your account."
      sectionInfoWidth="212px"
      direction={{ base: 'column', sm: 'row' }}
      spacing="16px"
      sectionInfoStyle={{ minW: { base: 'full', sm: '212px' } }}
    >
      <HStack alignItems="flex-start" spacing="57px">
        <VStack alignItems={{ md: 'flex-end' }} spacing="4px">
          <Text size="md" color="black">
            {data?.data?.user?.email ?? 'N/A'}
          </Text>
          <Text size="md" color="green.500">
            Verified
          </Text>
        </VStack>
      </HStack>
    </SectionWrapper>
  );
};

export default Email;
