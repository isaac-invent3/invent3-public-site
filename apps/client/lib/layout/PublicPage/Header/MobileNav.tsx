import {
  useDisclosure,
  Icon,
  VStack,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Flex,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import {
  GlobeIcon,
  HamburgerIcon,
} from '~/lib/components/CustomIcons/PublicFacingSite';

import Links from './data';
import Image from 'next/image';

const MobileNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleNavigation = (link: string) => {
    router.push(link);
    onClose();
  };

  return (
    <>
      <Icon
        as={HamburgerIcon}
        boxSize="24px"
        onClick={() => onOpen()}
        display={{ base: 'flex', xl: 'none' }}
        cursor="pointer"
        color="white"
      />

      <Drawer isOpen={isOpen} onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <Flex
            width="full"
            justifyContent="space-between"
            pl="16px"
            alignItems="center"
          >
            <Flex
              position="relative"
              height="35px"
              width="98px"
              flexShrink={0}
              mt="6px"
            >
              <Image src="/logo-blue.svg" alt="logo" fill />
            </Flex>
            <DrawerCloseButton p={0} m={0} />
          </Flex>
          <DrawerBody padding="32px">
            <VStack width="full" spacing="32px" mt="40px">
              {Links.map((item) => (
                <Text
                  color="primary.500"
                  size="md"
                  lineHeight="20px"
                  letterSpacing="0.04em"
                  whiteSpace="nowrap"
                  cursor="pointer"
                  onClick={() => handleNavigation(item.href)}
                >
                  {item.label}
                </Text>
              ))}
              <HStack spacing="8px">
                <Icon as={GlobeIcon} boxSize="24px" color="primary.500" />
                <Text size="lg" color="primary.500">
                  EN
                </Text>
              </HStack>
              <VStack spacing="16px">
                <Button
                  py="16px"
                  px="32px"
                  minH="49px"
                  rounded="8px"
                  fontWeight={700}
                  fontSize="14px"
                  lineHeight="16.63px"
                  color="primary.500"
                  variant="outline"
                  width="177px"
                  borderColor="primary.500"
                  as="a"
                  onClick={() => handleNavigation('/signin')}
                >
                  Sign In
                </Button>
                <Button
                  py="16px"
                  px="32px"
                  minH="49px"
                  rounded="8px"
                  bgColor="primary.500"
                  fontWeight={700}
                  fontSize="14px"
                  lineHeight="16.63px"
                  color="white"
                  width="177px"
                >
                  Request a Demo
                </Button>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav;
