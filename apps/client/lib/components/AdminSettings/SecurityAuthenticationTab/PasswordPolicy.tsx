import { Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import { FormSelect } from '@repo/ui/components';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import { passwordExpiryPeriodOptions, passwordLengthOptions } from '../utils';
import { useFormikContext } from 'formik';
import { Settings } from '~/lib/interfaces/settings.interfaces';

const PasswordPolicy = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const { setFieldValue, values } = useFormikContext<Settings>();
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
          <FormSelect
            name="minPasswordLengthId"
            title="Length"
            options={passwordLengthOptions}
            containerStyles={{
              width: isMobile ? '100%' : '179px',
            }}
            selectStyles={{ height: '46px', pt: '0px' }}
            showTitleAfterSelect={false}
          />
        </SectionWrapper>
        <SectionWrapper
          title="Require Special Characters"
          subtitle="Enhance security with special symbols"
          sectionInfoWidth="212px"
          sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
        >
          <Switch
            size="sm"
            isChecked={values.specialCharactersRequired}
            onChange={() =>
              setFieldValue(
                'specialCharactersRequired',
                !values.specialCharactersRequired
              )
            }
          />
        </SectionWrapper>
        <SectionWrapper
          title="Password Expiration"
          subtitle="Enable Password expiration in your organization"
          sectionInfoWidth="307px"
          sectionInfoStyle={{ maxW: { base: '60%', md: '307px' } }}
        >
          <Switch
            size="sm"
            isChecked={values.passwordExpirationEnabled}
            onChange={() =>
              setFieldValue(
                'passwordExpirationEnabled',
                !values.passwordExpirationEnabled
              )
            }
          />
        </SectionWrapper>
        {values.passwordExpirationEnabled && (
          <SectionWrapper
            title="Password Expiry Period"
            subtitle="Regular updates for safer access."
            sectionInfoWidth="212px"
            spacing={{ base: '8px', sm: '24px' }}
            direction={{ base: 'column', sm: 'row' }}
            sectionInfoStyle={{ maxW: { base: '100%', sm: '212px' } }}
          >
            <FormSelect
              name="passwordExpiryPeriodId"
              title="Period"
              options={passwordExpiryPeriodOptions}
              containerStyles={{
                width: isMobile ? '100%' : '179px',
              }}
              selectStyles={{ height: '46px', pt: '0px' }}
              showTitleAfterSelect={false}
            />
          </SectionWrapper>
        )}
      </VStack>
    </VStack>
  );
};

export default PasswordPolicy;
