import { Box, Button, HStack, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';

import { env } from 'next-runtime-env';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '~/lib/utils/constants';
import { extractTenantFromUrl } from '~/lib/utils/helperFunctions';

const NEXT_PUBLIC_API_URL = env('NEXT_PUBLIC_API_URL');

const SSOLogin = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const encodedRef = searchParams?.get('ref');
  const ref = encodedRef ? decodeURIComponent(encodedRef) : null;
  const toast = useToast();

  const handleGoogleSignin = async () => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/Invent3Pro/login/google-login-url${extractTenantFromUrl() ? `?tenantName=${extractTenantFromUrl()}` : ''}`
      );
      const { data } = await response.json();
      window.location.href = data?.url;
    } catch (error) {
      console.error('An error occurred during logout:', error);
    } finally {
    }
  };

  const handleGoogleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code) {
      setGoogleLoading(true);
      try {
        const res = await fetch(
          `${NEXT_PUBLIC_API_URL}/api/Invent3Pro/login/redirect?code=${code}&state=${state}`
        );

        const { data } = await res.json();
        if (!data.accessToken) throw new Error('No access token received');

        // Store user data in NextAuth session
        const result = await signIn('credentials', {
          ...data,
          roleIds: JSON.stringify(data?.roleIds),
          roleSystemModuleContextPermissions: JSON.stringify(
            data?.roleSystemModuleContextPermissions
          ),
          redirect: false,
        });
        if (result?.error) throw new Error(result.error);
        toast({
          title: 'Success',
          description: 'Login Successful',
          status: 'success',
          position: 'top-right',
          duration: 2000,
        });
        const companySlug = data?.companySlug;
        const destination = ref ?? `/${ROUTES.DASHBOARD}`;
        router.push(
          companySlug ? `/${companySlug}${destination}` : destination
        );
      } catch (error) {
        console.error('Error handling Google callback:', error);
      } finally {
        setGoogleLoading(false);
      }
    }
  };

  useEffect(() => {
    handleGoogleCallback();
  }, []);

  const providers = [
    {
      image: '/office-365.png',
      label: 'Login 365',
      action: () => {},
      isLoading: false,
    },
    {
      image: '/google.png',
      label: 'Google',
      action: () => handleGoogleSignin(),
      isLoading: googleLoading,
    },
  ];

  return (
    <HStack spacing="14px" width="full">
      {providers.map((provider) => (
        <Button
          bgColor="white"
          color="primary.500"
          py="15px"
          minH="50px"
          rounded="8px"
          key={provider.label}
          width="full"
          fontWeight={500}
          fontSize="14px"
          lineHeight="16.63px"
          gap="8px"
          onClick={() => provider.action()}
          isLoading={provider.isLoading}
        >
          <Box position="relative" width="20px" height="20px">
            <Image src={provider.image} alt={`${provider.label}-image`} fill />
          </Box>
          {provider.label}
        </Button>
      ))}
    </HStack>
  );
};

export default SSOLogin;
