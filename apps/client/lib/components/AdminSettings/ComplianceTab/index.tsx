import { StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import CompliancePolicies from './CompliancePolicies';
import ComplianceViolationAlertsAutomation from './ComplianceViolationAlertsAutomation';
import ComplianceReporting from './ComplianceReporting';
import { Button } from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import { complianceSchema } from '~/lib/schemas/settings.schema';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useUpdateSettingsMutation } from '~/lib/redux/services/utility.services';
import { useAppSelector } from '~/lib/redux/hooks';

const ComplianceTab = () => {
  const { handleSubmit } = useCustomMutation();
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();
  const settings = useAppSelector((state) => state.settings.settings);

  const formik = useFormik({
    initialValues: {
      iso27001: settings?.iso27001,
      gdpr: settings?.gdpr,
      soc2: settings?.soc2,
      hippa: settings?.hippa,
      pciDss: settings?.pciDss,
      complianceReviewFrequencyId: settings?.complianceReviewFrequencyId,
      complianceEnableAutoChecks: settings?.complianceEnableAutoChecks,
      complianceRequireDocumentationOfStatusChange:
        settings?.complianceRequireDocumentationOfStatusChange,
      complianceRequireDocumentExpiryAlerts:
        settings?.complianceRequireDocumentExpiryAlerts,
      complianceViolationAlerts: settings?.complianceViolationAlerts,
      complianceEscalationRulesId: settings?.complianceEscalationRulesId,
      complianceAutoSuspendViolatingPartner:
        settings?.complianceAutoSuspendViolatingPartner,
      complianceEnableAudits: settings?.complianceEnableAudits,
      complianceAuditRetentionPeriodId:
        settings?.complianceAuditRetentionPeriodId,
      complianceAutoReportScheduleId: settings?.complianceAutoReportScheduleId,
    },
    validationSchema: complianceSchema,
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
            <CompliancePolicies />
            <ComplianceViolationAlertsAutomation />
            <ComplianceReporting />
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

export default ComplianceTab;
