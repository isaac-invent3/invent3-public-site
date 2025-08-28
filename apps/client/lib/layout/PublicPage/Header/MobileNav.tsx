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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import {
  GlobeIcon,
  HamburgerIcon,
} from '~/lib/components/CustomIcons/PublicFacingSite';

import Links from './data';
import Image from 'next/image';
import { ChevronRightIcon } from '~/lib/components/CustomIcons';

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
          <DrawerBody
            padding="32px"
            position="relative"
            zIndex={9999}
            bgColor="white"
            height="full"
          >
            <VStack
              width="full"
              spacing="32px"
              mt="40px"
              alignItems="flex-start"
            >
              <Accordion allowToggle width="full">
                {Links.map((item, index) => (
                  <AccordionItem
                    key={index}
                    p={0}
                    m={0}
                    mb={index + 1 !== Links.length ? '32px' : 0}
                    border="none"
                  >
                    <AccordionButton
                      m={0}
                      p={0}
                      borderColor="none"
                      bgColor="none"
                      _hover={{ bgColor: 'none' }}
                    >
                      <Text
                        color="primary.500"
                        size="md"
                        lineHeight="20px"
                        letterSpacing="0.04em"
                        whiteSpace="nowrap"
                        cursor="pointer"
                        mr="8px"
                        onClick={() => {
                          !item.children && handleNavigation(item.href);
                        }}
                      >
                        {item.label}
                      </Text>
                      {item.children && (
                        <Icon
                          boxSize="16px"
                          color="primary.500"
                          as={ChevronRightIcon}
                        />
                      )}
                    </AccordionButton>
                    {item.children && (
                      <AccordionPanel p={0} m={0} mt="24px">
                        <VStack spacing="24px" alignItems="flex-start">
                          {item.children.submenu.map((item, index) => (
                            <Text
                              color="primary.500"
                              size="md"
                              lineHeight="20px"
                              letterSpacing="0.04em"
                              whiteSpace="nowrap"
                              cursor="pointer"
                              mr="8px"
                              onClick={() => {
                                handleNavigation(item.link);
                              }}
                            >
                              {item.title}
                            </Text>
                          ))}
                        </VStack>
                      </AccordionPanel>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
              <HStack spacing="8px">
                <Icon as={GlobeIcon} boxSize="24px" color="primary.500" />
                <Text
                  color="primary.500"
                  size="md"
                  lineHeight="20px"
                  letterSpacing="0.04em"
                >
                  EN
                </Text>
              </HStack>
              <VStack spacing="16px">
                {/* <Button
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
                </Button> */}
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
                  as="a"
                  href="/contact-us"
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
