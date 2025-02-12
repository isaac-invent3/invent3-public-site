import { HStack, Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { Select } from '@repo/ui/components';
import { appreanceOptions, dateFormatOptions, languageOptions } from './utils';
import {
  APPEARANCE,
  AUTOMATIC_TIMEZONE,
  DATE_FORMAT,
  filterOptionsById,
  getSystemConfigurationOptionIds,
  LANGUAGE,
} from '../utils';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateFormConfigurationOptions } from '~/lib/redux/slices/UserSlice';
import _ from 'lodash';
import useUpdateConfigurationOptions from '../Common/useUpdateConfigurationOptions';

const generalInfo = [
  {
    title: 'Language',
    subtitle: 'Choose Language',
    options: languageOptions,
    optionObject: LANGUAGE,
  },
  {
    title: 'Date Format',
    subtitle: 'Choose Date Format',
    options: dateFormatOptions,
    optionObject: DATE_FORMAT,
  },
  {
    title: 'Appearance',
    subtitle: 'Customize how the theme looks on your device',
    options: appreanceOptions,
    optionObject: APPEARANCE,
  },
];

const GeneralTab = () => {
  const { submitButton } = useUpdateConfigurationOptions();
  const dispatch = useAppDispatch();
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const formConfigurationOptions = useAppSelector(
    (state) => state.user.formConfigurationOptions
  );
  const existingSystemConfigurationOptionIds = getSystemConfigurationOptionIds(
    formConfigurationOptions
  );

  const isAutomaticTimezoneOn = existingSystemConfigurationOptionIds.includes(
    AUTOMATIC_TIMEZONE.AUTOMATIC_TIMEZONE_ON
  );
  const timeZoneNewOption = isAutomaticTimezoneOn
    ? AUTOMATIC_TIMEZONE.AUTOMATIC_TIMEZONE_OFF
    : AUTOMATIC_TIMEZONE.AUTOMATIC_TIMEZONE_ON;

  return (
    <VStack spacing="24px" width="full" alignItems="flex-end">
      <VStack
        spacing="24px"
        width="full"
        alignItems="flex-start"
        bgColor="white"
        p={{ base: '16px', md: '24px' }}
        pt="32px"
        rounded={{ md: '6px' }}
        minH={{ base: '60vh' }}
      >
        <SectionWrapper
          title="Automatic Time Zone"
          subtitle="Choose the category and the sub-category"
          sectionInfoWidth="212px"
          sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
        >
          <HStack spacing="16px">
            <Switch
              size="sm"
              isChecked={isAutomaticTimezoneOn}
              onChange={() =>
                dispatch(
                  updateFormConfigurationOptions({
                    option: timeZoneNewOption,
                    optionsToRemove: filterOptionsById(
                      timeZoneNewOption,
                      AUTOMATIC_TIMEZONE
                    ),
                  })
                )
              }
            />
            <Text color="black" size="md" whiteSpace="nowrap">
              GMT +01:00
            </Text>
          </HStack>
        </SectionWrapper>
        <VStack width="full" spacing="32px">
          {generalInfo.map((item, index) => {
            const existingInfo = _.intersection(
              existingSystemConfigurationOptionIds,
              Object.values(item.optionObject)
            );
            const selectedOption =
              existingInfo.length > 0 ? existingInfo?.[0] : undefined;
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
                  selectedOption={selectedOption}
                  containerStyles={{
                    width: isMobile ? '100%' : '179px',
                    height: '36px',
                  }}
                  selectStyles={{ height: '46px', pt: '0px' }}
                  showTitleAfterSelect={false}
                  handleSelect={(option) =>
                    dispatch(
                      updateFormConfigurationOptions({
                        option: +option.value,
                        optionsToRemove: filterOptionsById(
                          +option.value,
                          item.optionObject
                        ),
                      })
                    )
                  }
                />
              </SectionWrapper>
            );
          })}
        </VStack>
      </VStack>
      {submitButton}
    </VStack>
  );
};

export default GeneralTab;
