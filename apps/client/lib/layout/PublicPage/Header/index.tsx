import { Button, Flex, HStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

const Header = () => {
  //   const pathname = usePathname();
  return (
    <Flex
      bgColor="#000000"
      justifyContent="center"
      width="full"
      m={0}
      p={0}
      position="relative"
      zIndex={9999}
    >
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="center"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        py={{ base: '8px', lg: '18px' }}
        maxW="1440px"
      >
        <Flex
          position="relative"
          height={{ base: '35px', lg: '54px' }}
          width={{ base: '71px', lg: '108px' }}
          flexShrink={0}
          as="a"
          href="/"
        >
          <Image src="/logo-white.svg" alt="logo" fill />
        </Flex>
        <HStack spacing="40px">
          <DesktopNav />
          <HStack spacing="16px">
            <Link href="/signin" passHref>
              <Button
                py="16px"
                px="32px"
                minH="49px"
                rounded="8px"
                fontWeight={700}
                fontSize="14px"
                lineHeight="16.63px"
                color="white"
                borderColor="white"
                variant="outline"
                display={{ base: 'none', lg: 'flex' }}
                width="177px"
                _hover={{ color: 'primary.500', bgColor: 'white' }}
              >
                Sign In
              </Button>
            </Link>
            <Button
              py="16px"
              px="32px"
              minH="49px"
              rounded="8px"
              bgColor="white"
              fontWeight={700}
              fontSize="14px"
              lineHeight="16.63px"
              color="primary.500"
              display={{ base: 'none', lg: 'flex' }}
              width="177px"
            >
              Request a Demo
            </Button>
          </HStack>
          <MobileNav />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
