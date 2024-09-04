import { Box, Button, HStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const SSOLogin = () => {
  const providers = [
    {
      image: '/office-365.png',
      label: 'Login 365',
      action: () => {},
    },
    {
      image: '/google.png',
      label: 'Google',
      action: () => {},
    },
  ];

  return (
    <HStack spacing="14px" width="full">
      {providers.map((provider) => (
        <Button
          bgColor="white"
          py="15px"
          minH="50px"
          rounded="8px"
          key={provider.label}
          width="full"
          fontWeight={400}
          fontSize="14px"
          lineHeight="16.63px"
          gap="8px"
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
