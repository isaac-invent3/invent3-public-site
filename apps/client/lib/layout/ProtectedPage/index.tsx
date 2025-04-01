'use client';

import { Flex, HStack, Icon } from '@chakra-ui/react';

import Header from './Header';
import SideBar from './SideBar';
import { useEffect, useState } from 'react';
// import CountDownTimer from './CountDownTimer';

import {
  CaretLeftIcon,
  CaretRightIcon,
} from '~/lib/components/CustomIcons/layout';
import CompanyPageHeader from '~/lib/components/CompanyManagement/CompanyPageHeader';
import Notes from './Notes';
import { getSession, signOut } from 'next-auth/react';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const [isCollapse, setIsCollapse] = useState(true);

  //Session timeout check
  // This effect checks the session every minute and signs out the user if the session is invalid
  useEffect(() => {
    const interval = setInterval(async () => {
      const session = await getSession();
      if (!session) {
        signOut(); // Logs out the user
      }
    }, 1800 * 1000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex
      width="full"
      height="100vh"
      bgColor="#D9D9D9"
      overflowY="scroll"
      position="relative"
    >
      <Notes isCollapse={isCollapse} />

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
        <CompanyPageHeader />
        {children}
      </Flex>
    </Flex>
  );
};

export default ProtectedLayout;
