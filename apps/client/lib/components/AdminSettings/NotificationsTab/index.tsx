import { StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import Preferences from './Preference';
import AlertConfiguration from './AlertConfiguration';
import { Button } from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useUpdateSettingsMutation } from '~/lib/redux/services/utility.services';
import { useAppSelector } from '~/lib/redux/hooks';
import { getSession } from 'next-auth/react';
import { notificationSchema } from '~/lib/schemas/settings.schema';

const Notifications = () => {
  const { handleSubmit } = useCustomMutation();
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();
  const settings = useAppSelector((state) => state.settings.settings);

  const formik = useFormik({
    initialValues: {
      emailNotifications: settings?.emailNotifications,
      pushNotifications: settings?.pushNotifications,
      smsnotifications: settings?.smsnotifications,
      alertAssetMaintenanceDue: settings?.alertAssetMaintenanceDue,
      alertComplianceViolation: settings?.alertComplianceViolation,
      alertNewUserAdded: settings?.alertNewUserAdded,
      alertSubscriptionExpiresSoon: settings?.alertSubscriptionExpiresSoon,
      whatsappNotifications: settings?.whatsappNotifications,
    },
    validationSchema: notificationSchema,
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
            <Preferences />
            <AlertConfiguration />
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

export default Notifications;
