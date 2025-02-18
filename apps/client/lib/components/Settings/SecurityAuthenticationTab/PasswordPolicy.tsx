import { Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import { Select } from '@repo/ui/components';
import SectionWrapper from '../../Profile/Common/SectionWrapper';

const PasswordPolicy = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Password Policy
      </Text>
      <VStack width="full" spacing="16px">
        <SectionWrapper
          title="Minimum Password Length"
          subtitle="Ensure strong passwords with length."
          sectionInfoWidth="212px"
          spacing={{ base: '8px', sm: '24px' }}
          direction={{ base: 'column', sm: 'row' }}
          sectionInfoStyle={{ maxW: { base: '100%', sm: '212px' } }}
        >
          <Select
            title="Length"
            options={[]}
            selectedOption={undefined}
            containerStyles={{
              width: isMobile ? '100%' : '179px',
            }}
            selectStyles={{ height: '46px', pt: '0px' }}
            showTitleAfterSelect={false}
            handleSelect={() => {}}
          />
        </SectionWrapper>
        <SectionWrapper
          title="Require Special Characters"
          subtitle="Enhance security with special symbols"
          sectionInfoWidth="212px"
          sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
        >
          <Switch size="sm" isChecked={false} onChange={() => {}} />
        </SectionWrapper>
        <SectionWrapper
          title="Password Expiry Period"
          subtitle="Regular updates for safer access."
          sectionInfoWidth="212px"
          spacing={{ base: '8px', sm: '24px' }}
          direction={{ base: 'column', sm: 'row' }}
          sectionInfoStyle={{ maxW: { base: '100%', sm: '212px' } }}
        >
          <Select
            title="Period"
            options={[]}
            selectedOption={undefined}
            containerStyles={{
              width: isMobile ? '100%' : '179px',
            }}
            selectStyles={{ height: '46px', pt: '0px' }}
            showTitleAfterSelect={false}
            handleSelect={() => {}}
          />
        </SectionWrapper>
      </VStack>
    </VStack>
  );
};

export default PasswordPolicy;
