import { HStack, Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import { Select } from '@repo/ui/components';

import {
  dateFormatOptions,
  languageOptions,
} from '../../Profile/GeneralTab/utils';
import { DATE_FORMAT, LANGUAGE } from '../../Profile/utils';
import SectionWrapper from '../../Profile/Common/SectionWrapper';

const generalInfo = [
  {
    title: 'Language',
    subtitle: 'Choose your preferred communication language easily.',
    options: languageOptions,
    optionObject: LANGUAGE,
  },
  {
    title: 'Date Format',
    subtitle: 'Customize date display to your preference',
    options: dateFormatOptions,
    optionObject: DATE_FORMAT,
  },
];

const GeneralTab = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  return (
    <VStack spacing="24px" width="full" alignItems="flex-end">
      <VStack
        spacing="24px"
        width="full"
        alignItems="flex-start"
        bgColor="white"
        p={{ base: '16px', md: '24px' }}
        pt={{ base: '23px', lg: '35px' }}
        rounded={{ md: '6px' }}
        minH={{ base: '60vh' }}
      >
        <Text fontWeight={700} size="lg">
          System Preferences
        </Text>
        <VStack width="full" spacing="16px">
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
                <Select
                  title={item.title}
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
            title="Automatic Time Zone"
            subtitle="Syncs time zone based on location"
            sectionInfoWidth="212px"
            sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
          >
            <HStack spacing="16px">
              <Switch size="sm" isChecked={false} onChange={() => {}} />
              <Text color="black" size="md" whiteSpace="nowrap">
                GMT +01:00
              </Text>
            </HStack>
          </SectionWrapper>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default GeneralTab;
