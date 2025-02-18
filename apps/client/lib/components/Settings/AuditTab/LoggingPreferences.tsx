import { Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import { CheckBox, Select } from '@repo/ui/components';
import SectionWrapper from '../../Profile/Common/SectionWrapper';

const LoggingPreference = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Logging Preferences
      </Text>
      <VStack width="full" spacing="16px">
        <SectionWrapper
          title="Enable Audit Logs"
          subtitle="Track and monitor system activities"
          sectionInfoWidth="212px"
          sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
        >
          <Switch size="sm" isChecked={false} onChange={() => {}} />
        </SectionWrapper>
        <SectionWrapper
          title="Retention Period"
          subtitle="Define how long logs stay"
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
        <SectionWrapper
          title="Include User Activity in Logs"
          subtitle="Capture actions for accountability"
          sectionInfoWidth="212px"
          sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
        >
          <CheckBox isChecked={false} handleChange={() => {}} />
        </SectionWrapper>
      </VStack>
    </VStack>
  );
};

export default LoggingPreference;
