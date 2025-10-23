import { useAppFormik } from '~/lib/hooks/useAppFormik';
import { HStack, Switch, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button, FormSelect } from '@repo/ui/components';

import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import { FormikProvider } from 'formik';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useUpdateSettingsMutation } from '~/lib/redux/services/utility.services';
import { useAppSelector } from '~/lib/redux/hooks';
import { generalSchema } from '~/lib/schemas/settings.schema';
import { dateFormatOptions, languageOptions } from '../utils';

const generalInfo = [
  {
    name: 'languageId',
    title: 'Language',
    subtitle: 'Choose your preferred communication language easily.',
    options: languageOptions,
  },
  {
    name: 'dateFormatId',
    title: 'Date Format',
    subtitle: 'Customize date display to your preference',
    options: dateFormatOptions,
  },
];

const GeneralTab = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const { handleSubmit } = useCustomMutation();
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();
  const settings = useAppSelector((state) => state.settings.settings);

  const formik = useAppFormik({
    initialValues: {
      languageId: settings?.languageId,
      automaticTimeZoneId: settings?.automaticTimeZoneId,
      dateFormatId: settings?.dateFormatId,
    },
    validationSchema: generalSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const session = await getSession();
      await handleSubmit(
        updateSettings,
        {
          ...values,
          settingsId: settings?.settingId!,
          companyId: session?.user?.companyId!,
          lastModifiedBy: session?.user?.username!,
        },
        'Settings Updated Successfully'
      );
      setSubmitting(false);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
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
                    <FormSelect
                      name={item.name}
                      title={item.title}
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
                title="Automatic Time Zone"
                subtitle="Syncs time zone based on location"
                sectionInfoWidth="212px"
                sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
              >
                <HStack spacing="16px">
                  <Switch
                    size="sm"
                    isChecked={formik.values.automaticTimeZoneId}
                    onChange={() =>
                      formik.setFieldValue(
                        'automaticTimeZoneId',
                        !formik.values.automaticTimeZoneId
                      )
                    }
                  />
                  <Text color="black" size="md" whiteSpace="nowrap">
                    GMT +01:00
                  </Text>
                </HStack>
              </SectionWrapper>
            </VStack>
          </VStack>
          <Button
            type="submit"
            customStyles={{ width: '161px' }}
            isLoading={formik.isSubmitting || isLoading}
          >
            Save Changes
          </Button>
        </VStack>
      </form>
    </FormikProvider>
  );
};

export default GeneralTab;
