import { HStack, Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import { CheckBox, FormSelect } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import { Settings } from '~/lib/interfaces/settings.interfaces';
import { exportFrequencyOptions } from '../utils';

const SWTICH_DATA = [
  // {
  //   title: 'Enable Automatic Compliance Checks',
  //   subtitle: 'Automate monitoring for policy violations',
  //   name: 'complianceEnableAutoChecks',
  // },
  // {
  //   title: 'Require Documentation for Compliance Status Changes',
  //   subtitle: 'Mandate proof for status updates',
  //   name: 'complianceRequireDocumentationOfStatusChange',
  // },
  {
    title: 'Document Expiry Alerts',
    subtitle: 'Get notified of expiring documents',
    name: 'complianceRequireDocumentExpiryAlerts',
  },
];

const ComplianceFrameworkOptions = [
  { label: 'ISO 27001', name: 'iso27001' },
  { label: 'GDPR', name: 'gdpr' },
  { label: 'SOC 2', name: 'soc2' },
  { label: 'HIPAA', name: 'hippa' },
  { label: 'PCI DSS', name: 'pciDss' },
];

const CompliancePolicies = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const { setFieldValue, values } = useFormikContext<Settings>();

  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Compliance Policies
      </Text>
      <VStack
        width="full"
        alignItems="flex-start"
        spacing={{ base: '16px', lg: '24px' }}
      >
        {/* <SectionWrapper
          title="Define Compliance Frameworks"
          subtitle="Establish rules for regulatory adherence"
          sectionInfoWidth="212px"
          spacing={{ base: '8px', sm: '24px' }}
          direction={{ base: 'column', sm: 'row' }}
          sectionInfoStyle={{ maxW: { base: '100%', sm: '212px' } }}
        >
          <VStack spacing="16px">
            {ComplianceFrameworkOptions.map((item, index) => (
              <HStack spacing="39px" key={index}>
                <Text size="md" color="primary.500" minW="64px">
                  {item.label}
                </Text>
                <CheckBox
                  isChecked={
                    values[
                      item.name as
                        | 'gdpr'
                        | 'iso27001'
                        | 'soc2'
                        | 'hippa'
                        | 'pciDss'
                    ]
                  }
                  handleChange={() =>
                    setFieldValue(
                      item.name as
                        | 'gdpr'
                        | 'iso27001'
                        | 'soc2'
                        | 'hippa'
                        | 'pciDss',
                      !values[
                        item.name as
                          | 'gdpr'
                          | 'iso27001'
                          | 'soc2'
                          | 'hippa'
                          | 'pciDss'
                      ]
                    )
                  }
                />
              </HStack>
            ))}
          </VStack>
        </SectionWrapper> */}

        {/* <SectionWrapper
          title="Set Compliance Review Frequency"
          subtitle="Schedule periodic compliance evaluations"
          spacing={{ base: '8px', sm: '24px' }}
          direction={{ base: 'column', sm: 'row' }}
        >
          <FormSelect
            name="complianceReviewFrequencyId"
            title="Period"
            options={exportFrequencyOptions}
            containerStyles={{
              width: isMobile ? '100%' : '179px',
            }}
            selectStyles={{ height: '46px', pt: '0px' }}
            showTitleAfterSelect={false}
          />
        </SectionWrapper> */}
        {SWTICH_DATA.map((item, index) => {
          return (
            <SectionWrapper
              title={item.title}
              subtitle={item.subtitle}
              key={index}
            >
              <Switch
                size="sm"
                isChecked={
                  values[
                    item.name as
                      | 'complianceEnableAutoChecks'
                      | 'complianceRequireDocumentationOfStatusChange'
                      | 'complianceRequireDocumentExpiryAlerts'
                  ]
                }
                onChange={() =>
                  setFieldValue(
                    item.name as
                      | 'complianceEnableAutoChecks'
                      | 'complianceRequireDocumentationOfStatusChange'
                      | 'complianceRequireDocumentExpiryAlerts',
                    !values[
                      item.name as
                        | 'complianceEnableAutoChecks'
                        | 'complianceRequireDocumentationOfStatusChange'
                        | 'complianceRequireDocumentExpiryAlerts'
                    ]
                  )
                }
              />
            </SectionWrapper>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default CompliancePolicies;
