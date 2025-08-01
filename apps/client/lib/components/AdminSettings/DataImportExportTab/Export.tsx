import { Stack, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import { Button, Select } from '@repo/ui/components';

const selectInfo = [
  {
    title: 'Select Data to Export',
    subtitle: 'Choose specific data for export',
    label: 'Type',
    options: [],
  },
  {
    title: 'Export File Format',
    subtitle: 'Pick preferred file format type',
    label: 'Format',
    options: [],
  },
];

const Export = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Export
      </Text>
      <VStack width="full" alignItems="flex-start" spacing="16px">
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
                name="export"
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
          title="Export Destination"
          subtitle="Send data to desired location"
        >
          <Stack direction={{ base: 'column', md: 'row' }} spacing="24px">
            <Select
              name="module"
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

export default Export;
