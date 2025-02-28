import { Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import { CheckBox, FormSelect } from '@repo/ui/components';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import { useFormikContext } from 'formik';
import { Settings } from '~/lib/interfaces/settings.interfaces';

const LoggingPreference = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const { setFieldValue, values } = useFormikContext<Settings>();
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
          <Switch
            size="sm"
            isChecked={values.enableAuditLogs}
            onChange={() =>
              setFieldValue('enableAuditLogs', !values.enableAuditLogs)
            }
          />
        </SectionWrapper>
        <SectionWrapper
          title="Retention Period"
          subtitle="Define how long logs stay"
          sectionInfoWidth="212px"
          spacing={{ base: '8px', sm: '24px' }}
          direction={{ base: 'column', sm: 'row' }}
          sectionInfoStyle={{ maxW: { base: '100%', sm: '212px' } }}
        >
          <FormSelect
            name="retentionPeriodId"
            title="Period"
            options={[]}
            containerStyles={{
              width: isMobile ? '100%' : '179px',
            }}
            selectStyles={{ height: '46px', pt: '0px' }}
            showTitleAfterSelect={false}
          />
        </SectionWrapper>
        <SectionWrapper
          title="Include User Activity in Logs"
          subtitle="Capture actions for accountability"
          sectionInfoWidth="212px"
          sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
        >
          <CheckBox
            isChecked={values.logsIncludeUserActivity}
            handleChange={() =>
              setFieldValue(
                'logsIncludeUserActivity',
                !values.logsIncludeUserActivity
              )
            }
          />
        </SectionWrapper>
      </VStack>
    </VStack>
  );
};

export default LoggingPreference;
