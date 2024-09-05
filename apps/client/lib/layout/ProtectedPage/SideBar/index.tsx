import {
  Avatar,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
  Collapse,
  Box,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import sideBarData from './data';
import Image from 'next/image';
import {
  CaretLeftIcon,
  CaretRightIcon,
} from '~/lib/components/CustomIcons/layout';
import NavItem from './NavItem';

const SideBar = () => {
  const [isCollapse, setIsCollapse] = useState(true);

  return (
    <Flex
      direction="column"
      width={isCollapse ? '90px' : '249px'}
      mt="8px"
      ml="8px"
      pt="42px"
      pb="60px"
      height="calc(100vh - 16px)"
      justifyContent="space-between"
      borderTop="1px solid #F3F3F3"
      position="fixed"
      overflowY="auto"
      rounded="16px"
      transition="width 0.4s ease"
      bgImage="/layout-bg.png"
      bgSize="cover"
      zIndex={999}
    >
      <Flex direction="column">
        {/* Logo Section Starts */}
        <VStack
          alignItems="flex-start"
          mb="48px"
          pl={isCollapse ? '0' : '24px'}
          width="full"
        >
          <HStack width="full" position="relative">
            <Flex
              width="full"
              position="relative"
              justifyContent={isCollapse ? 'center' : 'flex-start'}
            >
              <Flex
                position="relative"
                height="35px"
                width={isCollapse ? '13px' : '125px'}
                justifyContent="center"
              >
                <Image
                  src={
                    isCollapse
                      ? '/logo-small-initials-white.svg'
                      : 'logo-white.svg'
                  }
                  alt="Invent3 logo"
                  fill
                />
              </Flex>
            </Flex>
            <Icon
              position="absolute"
              mr="8px"
              as={isCollapse ? CaretRightIcon : CaretLeftIcon}
              boxSize="20px"
              right={0}
              cursor="pointer"
              onClick={() => setIsCollapse((prev) => !prev)}
            />
          </HStack>
          <Box height="30px" width="full">
            <Collapse
              in={!isCollapse}
              transition={{
                exit: { duration: 0.6 },
                enter: { duration: 1 },
              }}
            >
              <Text
                fontSize="10px"
                fontWeight={700}
                lineHeight="11.88px"
                letterSpacing="0.2em"
                color="neutral.600"
              >
                ASSET MANAGEMENT PLATFORM
              </Text>
            </Collapse>
          </Box>
        </VStack>
        {/* Logo Section Ends */}
        {/* Navigation Menu */}
        <VStack width="full" spacing="8px" px={isCollapse ? '0' : '24px'}>
          {sideBarData.map((item) => (
            <NavItem {...item} key={item.name} isCollapse={isCollapse} />
          ))}
        </VStack>
        {/* Navigation Menu */}
      </Flex>
      {/* Footer starts Here */}
      <HStack
        spacing="19px"
        px={isCollapse ? 0 : '24px'}
        position="relative"
        zIndex={999}
      >
        <Flex
          width={isCollapse ? 'full' : 'max-content'}
          justifyContent="center"
        >
          <Avatar width="40px" height="40px" src={''} />
        </Flex>
        <Collapse in={!isCollapse}>
          <VStack spacing="4px" alignItems="flex-start" maxHeight="40px">
            <Text
              lineHeight="15.44px"
              fontSize="13px"
              letterSpacing="5%"
              fontWeight={700}
              textTransform="capitalize"
              color="neutral.100"
            >
              George Washington
            </Text>
            <Text
              lineHeight="14.26px"
              fontSize="12px"
              fontWeight={500}
              color="neutral.600"
            >
              Operation Manager
            </Text>
          </VStack>
        </Collapse>
      </HStack>
      {/* Footer Ends Here */}
    </Flex>
  );
};

export default SideBar;
