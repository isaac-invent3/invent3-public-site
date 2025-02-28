import { Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import { FormSelect } from '@repo/ui/components';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import { exportFormatOptions, exportFrequencyOptions } from '../utils';
import { useFormikContext } from 'formik';
import { Settings } from '~/lib/interfaces/settings.interfaces';

const generalInfo = [
  {
    name: 'exportFrequencyId',
    title: 'Export Frequency',
    subtitle: 'Choose daily, weekly, or monthly',
    label: 'Frequency',
    options: exportFrequencyOptions,
  },
  {
    name: 'exportFormatId',
    title: 'Export Formats',
    subtitle: 'Download logs in multiple formats',
    label: 'Format',
    options: exportFormatOptions,
  },
];

const ExportSettings = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const { setFieldValue, values } = useFormikContext<Settings>();
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Export Settings
      </Text>
      <VStack width="full" spacing={{ base: '16px', lg: '24px' }}>
        <SectionWrapper
          title="Enable Auto-Export of Logs"
          subtitle="Automate log backups for security"
          sectionInfoWidth="212px"
          sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
        >
          <Switch
            size="sm"
            isChecked={values.exportLogsAutoEnabled}
            onChange={() =>
              setFieldValue(
                'exportLogsAutoEnabled',
                !values.exportLogsAutoEnabled
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

export default ExportSettings;
