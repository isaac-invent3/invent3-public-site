import { useAppFormik } from '~/lib/hooks/useAppFormik';
import { StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import LoginSecurity from './LoginSecurity';
import PasswordPolicy from './PasswordPolicy';
import { Button } from '@repo/ui/components';
import { FormikProvider } from 'formik';
import { useAppSelector } from '~/lib/redux/hooks';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useUpdateSettingsMutation } from '~/lib/redux/services/utility.services';
import { getSession } from 'next-auth/react';
import { securityAuthenticationSchema } from '~/lib/schemas/settings.schema';

const SecurityAuthentication = () => {
  const { handleSubmit } = useCustomMutation();
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();
  const settings = useAppSelector((state) => state.settings.settings);

  const formik = useAppFormik({
    initialValues: {
      twoFactorAuthentication: settings?.twoFactorAuthentication,
      sessionDurationTimeoutId: settings?.sessionDurationTimeoutId,
      maxFailedAttempts: settings?.maxFailedAttempts,
      minPasswordLengthId: settings?.minPasswordLengthId,
      specialCharactersRequired: settings?.specialCharactersRequired,
      passwordExpiryPeriodId: settings?.passwordExpiryPeriodId,
      passwordExpirationEnabled: settings?.passwordExpirationEnabled,
      maxDormantPeriod: settings?.maxDormantPeriod,
    },
    validationSchema: securityAuthenticationSchema,
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
            <LoginSecurity />
            <PasswordPolicy />
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

export default SecurityAuthentication;
