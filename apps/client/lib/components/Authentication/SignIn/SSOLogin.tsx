import { Box, Button, HStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';

import { env } from 'next-runtime-env';

const NEXT_PUBLIC_API_URL = env('NEXT_PUBLIC_API_URL');

const SSOLogin = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const handleGoogleSignin = async () => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/Invent3Pro/login/google-login-url`
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
          `${NEXT_PUBLIC_API_URL}/Invent3Pro/login/redirect?code=${code}&state=${state}`
        );

        const { data } = await res.json();
        // Manually set the session using the NextAuth session update method
        const response = await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          window.location.href = '/dashboard'; // Redirect manually
        } else {
          throw new Error('Failed to update session');
        }
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
