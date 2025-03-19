import { StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import LoggingPreference from './LoggingPreferences';
import ExportSettings from './ExportSettings';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useUpdateSettingsMutation } from '~/lib/redux/services/utility.services';
import { useAppSelector } from '~/lib/redux/hooks';
import { FormikProvider, useFormik } from 'formik';
import { auditLogSchema } from '~/lib/schemas/settings.schema';
import { getSession } from 'next-auth/react';
import { Button } from '@repo/ui/components';

const AuditTab = () => {
  const { handleSubmit } = useCustomMutation();
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();
  const settings = useAppSelector((state) => state.settings.settings);

  const formik = useFormik({
    initialValues: {
      enableAuditLogs: settings?.enableAuditLogs,
      retentionPeriodId: settings?.retentionPeriodId,
      logsIncludeUserActivity: settings?.logsIncludeUserActivity,
      exportLogsAutoEnabled: settings?.exportLogsAutoEnabled,
      exportFrequencyId: settings?.exportFrequencyId,
      exportFormatId: settings?.exportFormatId,
    },
    validationSchema: auditLogSchema,
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
            spacing="32px"
            width="full"
            alignItems="flex-start"
            bgColor="white"
            p={{ base: '16px', md: '24px' }}
            pt={{ base: '23px', lg: '35px' }}
            rounded={{ md: '6px' }}
            minH={{ base: '60vh' }}
            divider={<StackDivider borderColor="#BBBBBB" />}
          >
            <LoggingPreference />
            <ExportSettings />
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

export default AuditTab;
