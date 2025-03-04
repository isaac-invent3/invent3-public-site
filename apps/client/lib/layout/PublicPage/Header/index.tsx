import { Button, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';

import Links from './data';
import { GlobeIcon } from '~/lib/components/CustomIcons/PublicFacingSite';
import MobileNav from './MobileNav';

const Header = () => {
  //   const pathname = usePathname();
  return (
    <Flex
      bgColor="primary.500"
      justifyContent="center"
      width="full"
      m={0}
      p={0}
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
        >
          <Image src="/logo-white.svg" alt="logo" fill />
        </Flex>
        <HStack spacing="40px">
          <HStack spacing="32px" display={{ base: 'none', lg: 'flex' }}>
            {Links.map((item) => (
              <Link href={item.href} passHref key={item.label}>
                <Text color="white" size="md" whiteSpace="nowrap">
                  {item.label}
                </Text>
              </Link>
            ))}
            <HStack spacing="8px">
              <Icon as={GlobeIcon} boxSize="24px" color="white" />
              <Text size="lg" color="white">
                EN
              </Text>
            </HStack>
          </HStack>
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
          >
            Request a Demo
          </Button>
          <MobileNav />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
