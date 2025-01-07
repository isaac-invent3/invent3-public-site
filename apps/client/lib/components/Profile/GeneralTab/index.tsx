import { HStack, Switch, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { Select } from '@repo/ui/components';

const GeneralTab = () => {
  return (
    <VStack
      spacing="24px"
      width="full"
      alignItems="flex-start"
      bgColor="white"
      p="24px"
      pt="32px"
      rounded="6px"
      minH="60vh"
    >
      <SectionWrapper
        title="Automatic Time Zone"
        subtitle="Choose the category and the sub-category"
        sectionInfoWidth="212px"
      >
        <HStack spacing="16px">
          <Switch size="sm" />
          <Text color="black" size="md">
            GMT +01:00
          </Text>
        </HStack>
      </SectionWrapper>
      <SectionWrapper
        title="Language"
        subtitle="Choose the category and the sub-category"
        sectionInfoWidth="212px"
      >
        <Select
          title="Language"
          options={[]}
          containerStyles={{ width: '179px', height: '36px' }}
          selectStyles={{ height: '46px', pt: '0px' }}
          showTitleAfterSelect={false}
        />
      </SectionWrapper>
      <SectionWrapper
        title="Date Format"
        subtitle="Choose the category and the sub-category"
        sectionInfoWidth="212px"
      >
        <Select
          title="Date Format"
          options={[]}
          containerStyles={{ width: '179px', height: '36px' }}
          selectStyles={{ height: '46px', pt: '0px' }}
          showTitleAfterSelect={false}
        />
      </SectionWrapper>
      <SectionWrapper
        title="Appearance"
        subtitle="Customize how the theme looks on your device"
        sectionInfoWidth="212px"
      >
        <Select
          title="Appearance"
          options={[]}
          containerStyles={{ width: '179px', height: '36px' }}
          selectStyles={{ height: '46px', pt: '0px' }}
          showTitleAfterSelect={false}
        />
      </SectionWrapper>
    </VStack>
  );
};

export default GeneralTab;
