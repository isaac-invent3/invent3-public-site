import { Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import { FormSelect } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import { Settings } from '~/lib/interfaces/settings.interfaces';
import { exportFrequencyOptions } from '../utils';

const ComplianceViolationAlertsAutomation = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const { setFieldValue, values } = useFormikContext<Settings>();
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Compliance Violation Alerts & Automation
      </Text>
      <VStack width="full" alignItems="flex-start" spacing="16px">
        <SectionWrapper
          title="Enable Compliance Violation Alerts"
          subtitle="Receive instant non-compliance notifications"
          sectionInfoWidth="232px"
        >
          <Switch
            size="sm"
            isChecked={values.complianceViolationAlerts}
            onChange={() =>
              setFieldValue(
                'complianceViolationAlerts',
                !values.complianceViolationAlerts
              )
            }
          />
        </SectionWrapper>
        <SectionWrapper
          title="Escalation Rules for Non-Compliance"
          subtitle="Define actions for unresolved violations"
          spacing={{ base: '8px', sm: '24px' }}
          direction={{ base: 'column', sm: 'row' }}
        >
          <FormSelect
            name="complianceEscalationRulesId"
            title="Period"
            options={exportFrequencyOptions}
            selectedOption={undefined}
            containerStyles={{
              width: isMobile ? '100%' : '179px',
            }}
            selectStyles={{ height: '46px', pt: '0px' }}
          />
        </SectionWrapper>
        <SectionWrapper
          title="Auto-Suspend Non-Compliant Vendors/Companies"
          subtitle="Restrict access for rule breakers."
          sectionInfoWidth="318px"
        >
          <Switch
            size="sm"
            isChecked={values.complianceAutoSuspendViolatingPartner}
            onChange={() =>
              setFieldValue(
                'complianceAutoSuspendViolatingPartner',
                !values.complianceAutoSuspendViolatingPartner
              )
            }
          />
        </SectionWrapper>
      </VStack>
    </VStack>
  );
};

export default ComplianceViolationAlertsAutomation;
