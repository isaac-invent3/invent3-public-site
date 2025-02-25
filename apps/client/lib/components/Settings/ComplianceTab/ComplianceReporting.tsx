import { Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../../Profile/Common/SectionWrapper';
import { Button, FormSelect } from '@repo/ui/components';
import { exportFrequencyOptions } from '../utils';
import { useFormikContext } from 'formik';
import { Settings } from '~/lib/interfaces/settings.interfaces';

const selectInfo = [
  {
    name: 'complianceAuditRetentionPeriodId',
    title: 'Set Audit Log Retention Period',
    subtitle: 'Define log storage duration',
    label: 'Duration',
    options: exportFrequencyOptions,
  },
  {
    name: 'complianceAutoReportScheduleId',
    title: 'Automated Compliance Reports Schedule',
    subtitle: 'Generate reports at set intervals.',
    label: 'Times',
    options: exportFrequencyOptions,
  },
];

const ComplianceReporting = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const { setFieldValue, values } = useFormikContext<Settings>();
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Compliance Reporting & Audit Logs
      </Text>
      <VStack width="full" alignItems="flex-start" spacing="16px">
        <SectionWrapper
          title="Enable Compliance Audit Logging"
          subtitle="Track all compliance-related activities"
          sectionInfoWidth="210px"
        >
          <Switch
            size="sm"
            isChecked={values.complianceEnableAudits}
            onChange={() =>
              setFieldValue(
                'complianceEnableAudits',
                !values.complianceEnableAudits
              )
            }
          />
        </SectionWrapper>
        {selectInfo.map((item, index) => {
          return (
            <SectionWrapper
              title={item.title}
              subtitle={item.subtitle}
              key={index}
              spacing={{ base: '8px', sm: '24px' }}
              direction={{ base: 'column', sm: 'row' }}
              sectionInfoStyle={{ maxW: { base: '100%' } }}
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
        <SectionWrapper
          title="Export Compliance Reports"
          subtitle="Download compliance insights easily."
          sectionInfoWidth="193px"
        >
          <Button customStyles={{ width: '161px' }}>Export</Button>
        </SectionWrapper>
      </VStack>
    </VStack>
  );
};

export default ComplianceReporting;
