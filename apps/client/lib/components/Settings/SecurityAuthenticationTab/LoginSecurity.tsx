import { Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import { Select } from '@repo/ui/components';
import SectionWrapper from '../../Profile/Common/SectionWrapper';

const generalInfo = [
  {
    title: 'Session Timeout Duration',
    subtitle: 'Auto-logout after inactivity for safety.',
    label: 'Duration',
    options: [],
  },
  {
    title: 'Max Failed Login Attempts Before Lockout',
    subtitle: 'Prevent unauthorized access with account lock.',
    label: 'Times',
    options: [],
  },
];

const LoginSecurity = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Login Security
      </Text>
      <VStack width="full" spacing="16px">
        {generalInfo.map((item, index) => {
          return (
            <SectionWrapper
              title={item.title}
              subtitle={item.subtitle}
              sectionInfoWidth="212px"
              key={index}
              spacing={{ base: '8px', sm: '24px' }}
              direction={{ base: 'column', sm: 'row' }}
              sectionInfoStyle={{ maxW: { base: '100%', sm: '212px' } }}
            >
              <Select
                title={item.label}
                options={item.options}
                selectedOption={undefined}
                containerStyles={{
                  width: isMobile ? '100%' : '179px',
                }}
                selectStyles={{ height: '46px', pt: '0px' }}
                showTitleAfterSelect={false}
                handleSelect={() => {}}
              />
            </SectionWrapper>
          );
        })}

        <SectionWrapper
          title="Automatic Time Zone"
          subtitle="Syncs time zone based on location"
          sectionInfoWidth="212px"
          sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
        >
          <Switch size="sm" isChecked={false} onChange={() => {}} />
        </SectionWrapper>
      </VStack>
    </VStack>
  );
};

export default LoginSecurity;
