import { HStack, Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../../Profile/Common/SectionWrapper';
import { CheckBox, Select } from '@repo/ui/components';

const SWTICH_DATA = [
  {
    title: 'Enable Automatic Compliance Checks',
    subtitle: 'Automate monitoring for policy violations',
  },
  {
    title: 'Require Documentation for Compliance Status Changes',
    subtitle: 'Mandate proof for status updates',
  },
  {
    title: 'Document Expiry Alerts',
    subtitle: 'Get notified of expiring documents',
  },
];

const ComplianceFramework = ['ISO 27001', 'GDPR', 'SOC 2', 'HIPAA', 'PCI DSS'];

const CompliancePolicies = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');

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
        <SectionWrapper
          title="Define Compliance Frameworks"
          subtitle="Establish rules for regulatory adherence"
          sectionInfoWidth="212px"
          spacing={{ base: '8px', sm: '24px' }}
          direction={{ base: 'column', sm: 'row' }}
          sectionInfoStyle={{ maxW: { base: '100%', sm: '212px' } }}
        >
          <VStack spacing="16px">
            {ComplianceFramework.map((item, index) => (
              <HStack spacing="39px" key={index}>
                <Text size="md" color="primary.500" minW="64px">
                  {item}
                </Text>
                <CheckBox isChecked handleChange={() => {}} />
              </HStack>
            ))}
          </VStack>
        </SectionWrapper>

        <SectionWrapper
          title="Set Compliance Review Frequency"
          subtitle="Schedule periodic compliance evaluations"
          spacing={{ base: '8px', sm: '24px' }}
          direction={{ base: 'column', sm: 'row' }}
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
        {SWTICH_DATA.map((item, index) => {
          return (
            <SectionWrapper
              title={item.title}
              subtitle={item.subtitle}
              key={index}
            >
              <Switch size="sm" isChecked={false} onChange={() => {}} />
            </SectionWrapper>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default CompliancePolicies;
