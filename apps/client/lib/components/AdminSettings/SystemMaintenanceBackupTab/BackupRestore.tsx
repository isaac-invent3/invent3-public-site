import { Stack, Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import { Button, Select } from '@repo/ui/components';

const selectInfo = [
  {
    title: 'Backup Frequency',
    subtitle: 'Choose how often backups occur',
    label: 'Frequency',
    options: [],
  },
  {
    title: 'Backup Location',
    subtitle: 'Select a secure storage destination',
    label: 'Storage',
    options: [],
  },
];

const BackupRestore = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Backup & Restore
      </Text>
      <VStack width="full" alignItems="flex-start" spacing="16px">
        <SectionWrapper
          title="Enable Automatic Backups"
          subtitle="Ensure data safety with auto backups"
          sectionInfoWidth="210px"
        >
          <Switch size="sm" isChecked={false} onChange={() => {}} />
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
          title="Restore from Backup"
          subtitle="Recover lost data in seconds"
        >
          <Stack direction={{ base: 'column', md: 'row' }} spacing="24px">
            <Select
              title="Module"
              options={[]}
              selectedOption={undefined}
              containerStyles={{
                width: isMobile ? '100%' : '261px',
              }}
              selectStyles={{ height: '46px', pt: '0px' }}
              showTitleAfterSelect={false}
              handleSelect={() => {}}
            />
            <Button customStyles={{ width: '158px', height: '46px' }}>
              Export
            </Button>
          </Stack>
        </SectionWrapper>
      </VStack>
    </VStack>
  );
};

export default BackupRestore;
