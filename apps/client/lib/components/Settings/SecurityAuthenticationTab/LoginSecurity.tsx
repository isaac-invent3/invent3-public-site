import { Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import { FormSelect } from '@repo/ui/components';
import SectionWrapper from '../../Profile/Common/SectionWrapper';
import {
  maxFailedLoginAttemptsOptions,
  sessionTimeoutDurationOptions,
} from '../utils';
import { useFormikContext } from 'formik';
import { Settings } from '~/lib/interfaces/settings.interfaces';

const generalInfo = [
  {
    name: 'sessionDurationTimeoutId',
    title: 'Session Timeout Duration',
    subtitle: 'Auto-logout after inactivity for safety.',
    label: 'Duration',
    options: sessionTimeoutDurationOptions,
  },
  {
    name: 'maxFailedAttempts',
    title: 'Max Failed Login Attempts Before Lockout',
    subtitle: 'Prevent unauthorized access with account lock.',
    label: 'Times',
    options: maxFailedLoginAttemptsOptions,
  },
];

const LoginSecurity = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const { setFieldValue, values } = useFormikContext<Settings>();
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Login Security
      </Text>
      <VStack width="full" spacing="16px">
        <SectionWrapper
          title="Require Two-Factor Authentication (2FA)"
          subtitle="Enhance security with extra verification step."
          sectionInfoWidth="270px"
          sectionInfoStyle={{ maxW: { base: '60%', md: '270px' } }}
        >
          <Switch
            size="sm"
            isChecked={values.twoFactorAuthentication}
            onChange={() =>
              setFieldValue(
                'twoFactorAuthentication',
                !values.twoFactorAuthentication
              )
            }
          />
        </SectionWrapper>
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
              <FormSelect
                name={item.name}
                title={item.label}
                options={item.options}
                containerStyles={{
                  width: isMobile ? '100%' : '179px',
                }}
                selectStyles={{ height: '46px', pt: '0px' }}
                showTitleAfterSelect={false}
              />
            </SectionWrapper>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default LoginSecurity;
