'use client';

import { Flex } from '@chakra-ui/react';

import Header from './Header';
import Notes from './Notes';
import SideBar from './SideBar';

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

     <Notes />
    </Flex>
  );
};

export default ProtectedLayout;
