import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const InfoLearnMore = () => {
  return (
    <Flex
      direction={{ base: 'row', md: 'column' }}
      gap="24px"
      alignItems={{ base: 'center', md: 'flex-start' }}
      justifyContent="space-between"
      width="full"
    >
      <Text
        fontWeight={700}
        color="white"
        fontSize={{ base: '12px', md: '18px' }}
        lineHeight={{ base: '14.26px', md: '21.38px' }}
        maxW={{ base: '204px', md: '370px' }}
      >
        A new way to experience managing your physical assets and facilities
        using AI
      </Text>
      <Link href="#">
        <Text
          fontWeight={700}
          size={{ base: 'base', md: 'md' }}
          color={{ base: '#98FEFE', md: '#E4FEFE' }}
        >
          Learn more
        </Text>
      </Link>
    </Flex>
  );
};
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Flex
      position="relative"
      width="full"
      height="100vh"
      bgImage={{ base: './auth-bg-mobile.png', md: './auth-bg.png' }}
      bgSize="cover"
      justifyContent="center"
      overflow="hidden"
    >
      <Flex
        width="full"
        maxW="1440px"
        height="full"
        overflow="auto"
        position="relative"
        px={{ base: '25px', lg: '100px' }}
        pt={{ base: '24px', lg: '78px' }}
        pb={{ base: '19px', lg: '29px' }}
        direction="column"
        justifyContent="space-between"
        gap="105px"
        sx={{
          scrollbarWidth: '0px',
          scrollbarColor: 'transparent transparent',
          '&::-webkit-scrollbar': {
            width: '0px',
            height: '0px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'transparent',
          },
        }}
      >
        <Flex
          position="absolute"
          left="173px"
          top="0"
          zIndex={99}
          display={{ base: 'none', md: 'flex' }}
        >
          <Flex width="225px" height="100vh" position="fixed" top="-30%">
            <Image src="/logo-initials.svg" fill alt="logo-initial" />
          </Flex>
        </Flex>
        <Flex
          width="full"
          position="relative"
          zIndex={5}
          justifyContent={{ base: 'center', lg: 'space-between' }}
          alignItems={{ base: 'center', lg: 'flex-start' }}
          height="full"
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: '27px', lg: 'none' }}
        >
          <Flex
            top={0}
            position={{ base: 'absolute', lg: 'relative' }}
            width={{ base: '86.27px', md: '122px' }}
            height={{ base: '24px', md: '34px' }}
            alignSelf="flex-start"
          >
            <Image src="/logo-white.svg" fill alt="Invent3 white logo" />
          </Flex>
          {children}
        </Flex>
        {/* Footer Starts Here */}
        <VStack width="full" spacing="65px">
          <Flex width="full" display={{ lg: 'none' }}>
            <InfoLearnMore />
          </Flex>
          <Flex
            width="full"
            pr="5px"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <VStack spacing="105px" alignItems="flex-start" position="relative">
              <Flex
                width="344px"
                maxW="344px"
                display={{ base: 'none', lg: 'flex' }}
                position="absolute"
                bottom="115px"
              >
                <InfoLearnMore />
              </Flex>
              <Text color="neutral.700">Copyright (c) 2024</Text>
            </VStack>
            <HStack spacing={{ base: '24px', md: '40px' }} color="brand.500">
              <Link href="#">
                <Text fontWeight={700}>Terms of use</Text>
              </Link>
              <Link href="#">
                <Text fontWeight={700}>Privacy Policy</Text>
              </Link>
            </HStack>
          </Flex>
        </VStack>
        {/* Footer Ends Here */}
      </Flex>
    </Flex>
  );
};

export default AuthLayout;
