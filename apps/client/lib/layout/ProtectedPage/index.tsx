'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import SideBar from './SideBar';
import Header from './Header';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <Flex width="full" height="100vh" bgColor="#D9D9D9" overflowY="scroll">
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
    </Flex>
  );
};

export default ProtectedLayout;
