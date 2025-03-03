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
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';

import { HamburgerIcon } from '~/lib/components/CustomIcons/layout';

import Links from './data';
import Image from 'next/image';

const MobileNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
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
        display={{ base: 'flex', lg: 'none' }}
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
              width="71px"
              flexShrink={0}
              mt="6px"
            >
              <Image src="/logo-blue.svg" alt="logo" fill />
            </Flex>
            <DrawerCloseButton p={0} m={0} />
          </Flex>
          <DrawerBody padding="32px">
            <VStack width="full" spacing="24px" mt="40px">
              {Links.map((item) => (
                <Text
                  color={pathname === item.href ? 'customRed.500' : 'black'}
                  size="md"
                  _hover={{
                    color: 'customRed.500',
                  }}
                  whiteSpace="nowrap"
                  cursor="pointer"
                  onClick={() => handleNavigation(item.href)}
                >
                  {item.label}
                </Text>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav;
