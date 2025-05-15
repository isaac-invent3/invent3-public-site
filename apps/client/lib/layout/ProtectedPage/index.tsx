'use client';

import { Flex, HStack, Icon } from '@chakra-ui/react';

import Header from './Header';
import SideBar from './SideBar';
import { useEffect, useState } from 'react';
import CountDownTimer from './CountDownTimer';

import {
  CaretLeftIcon,
  CaretRightIcon,
} from '~/lib/components/CustomIcons/layout';
import CompanyPageHeader from '~/lib/components/CompanyManagement/CompanyPageHeader';
import Notes from './Notes';
import { getSession, useSession } from 'next-auth/react';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import useSignalR from '~/lib/hooks/useSignalR';
import { handleSignOut } from '~/app/actions/authActions';
import AssistanceGuide from '~/lib/components/CompanyManagement/JourneyGuide/AssistanceGuide';
import { ROLE_IDS_ENUM } from '~/lib/utils/constants';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showAssistantGuide, setShowAssistantGuide] = useState(true);
  const { data, update } = useSession();

  //Session timeout check
  // This effect checks the session every minute and signs out the user if the session is invalid
  useEffect(() => {
    const interval = setInterval(
      async () => {
        const session = await getSession();
        if (!session) {
          handleSignOut(); // Logs out the user
        }
      },
      31 * 60 * 1000
    ); // Check every 31 minutes

    return () => clearInterval(interval);
  }, []);

  // Hide Assistant Guide after 1 minutes
  useEffect(() => {
    if (data?.user && !data?.user?.hasShownGuide) {
      setShowAssistantGuide(true);
    }
  }, []);

  // SignalR Connection
  const connectionState = useSignalR('userRole-hub');

  useSignalREventHandler({
    eventName: 'UserTriggerLogout',
    connectionState,
    callback: (event) => {
      console.log('UserTriggerLogout event received:', event);
      // Handle the logout event
      setShowCountdown(true);
    },
  });

  return (
    <Flex
      width="full"
      height="100vh"
      bgColor="#D9D9D9"
      overflowY="scroll"
      position="relative"
    >
      <Notes isCollapse={isCollapse} />
      {showCountdown && <CountDownTimer />}

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
        {data?.user?.roleIds.includes(ROLE_IDS_ENUM.CLIENT_ADMIN) ||
          (data?.user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY) && (
            <AssistanceGuide
              isOpen={showAssistantGuide}
              onClose={() => setShowAssistantGuide(false)}
            />
          ))}
        <CompanyPageHeader />
        {children}
      </Flex>
    </Flex>
  );
};

export default ProtectedLayout;
