'use client';

import { Flex, HStack, Icon } from '@chakra-ui/react';

import SideBar from './SideBar';
import Header from './Header';
import { useState } from 'react';
// import CountDownTimer from './CountDownTimer';

import {
  CaretLeftIcon,
  CaretRightIcon,
} from '~/lib/components/CustomIcons/layout';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const [isCollapse, setIsCollapse] = useState(true);
  return (
    <Flex
      width="full"
      height="100vh"
      bgColor="#D9D9D9"
      overflowY="scroll"
      position="relative"
    >
      <HStack position="relative">
        <SideBar isCollapse={isCollapse} setIsCollapse={setIsCollapse} />

        {!isCollapse && (
          <Flex
            position="absolute"
            right="-270px"
            width="30px"
            height="30px"
            rounded="full"
            bgColor="primary.500"
            justifyContent="center"
            alignItems="center"
            top="55px"
            zIndex={9999}
          >
            <Icon
              as={isCollapse ? CaretRightIcon : CaretLeftIcon}
              boxSize="20px"
              cursor="pointer"
              onClick={() => setIsCollapse((prev) => !prev)}
            />
          </Flex>
        )}
      </HStack>
      <Flex
        width={{ base: 'full', md: 'calc(100vw - 88px)' }}
        ml={{ md: '88px' }}
        px={{ base: 0, md: '24px' }}
        pt="32px"
        direction="column"
        height="full"
      >
        <Header setIsCollapse={setIsCollapse} />
        {children}
      </Flex>
      {/* <CountDownTimer /> */}
    </Flex>
  );
};

export default ProtectedLayout;
