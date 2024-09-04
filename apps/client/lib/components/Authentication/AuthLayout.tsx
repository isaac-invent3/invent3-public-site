import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Flex
      position="relative"
      width="full"
      height="full"
      bgImage={'./auth-bg.png'}
      bgSize="cover"
      justifyContent="center"
    >
      <Flex
        width="full"
        maxW="1440px"
        height="full"
        h="100vh"
        overflowY="scroll"
        position="relative"
        px="100px"
        pt="78px"
        pb="29px"
        direction="column"
        justifyContent="space-between"
        gap="105px"
      >
        <Flex position="absolute" left="173px" top="0" zIndex={99}>
          <Flex width="225px" height="70vh" position="absolute">
            <Image src="/logo-initials.svg" fill alt="logo-initial" />
          </Flex>
        </Flex>
        <Flex
          width="full"
          position="relative"
          zIndex={5}
          justifyContent="space-between"
          height="min-content"
        >
          <Flex direction="column" height="full" justifyContent="space-between">
            <Flex position="relative" width="122px" height="34px">
              <Image src="/logo-white.svg" fill alt="Invent3 white logo" />
            </Flex>
            <VStack alignItems="flex-start" spacing="24px">
              <Text
                fontWeight={700}
                color="white"
                fontSize="18px"
                lineHeight="21.38px"
                maxW="344px"
              >
                A new way to experience managing your assets and facility using
                AI
              </Text>
              <Link href="#">
                <Text
                  fontWeight={700}
                  fontSize="14px"
                  lineHeight="16.63px"
                  color="secondary.pale.accent"
                >
                  Learn more
                </Text>
              </Link>
            </VStack>
          </Flex>
          {children}
        </Flex>
        {/* Footer Starts Here */}
        <Flex width="full" pr="5px" justifyContent="space-between">
          <Text fontSize="12px" lineHeight="14.26px" color="neutral.700">
            Copyright (c) 2024
          </Text>
          <HStack
            spacing="40px"
            fontSize="12px"
            lineHeight="14.26px"
            color="brand.500"
          >
            <Link href="#">
              <Text fontWeight={700}>Terms of use</Text>
            </Link>
            <Link href="#">
              <Text fontWeight={700}>Privacy Policy</Text>
            </Link>
          </HStack>
        </Flex>
        {/* Footer Ends Here */}
      </Flex>
    </Flex>
  );
};

export default AuthLayout;
