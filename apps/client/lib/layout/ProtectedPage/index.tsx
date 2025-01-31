'use client';

import { Flex } from '@chakra-ui/react';

import SideBar from './SideBar';
import Header from './Header';
// import CountDownTimer from './CountDownTimer';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <Flex
      width="full"
      height="100vh"
      bgColor="#D9D9D9"
      overflowY="scroll"
      position="relative"
    >
      <SideBar />
      <Flex
        width="calc(100vw - 73px)"
        ml="73px"
        px="24px"
        pt="32px"
        direction="column"
        position="relative"
        height="full"
      >
        <Header />
        {children}
      </Flex>
      {/* <CountDownTimer /> */}
    </Flex>
  );
};

export default ProtectedLayout;
