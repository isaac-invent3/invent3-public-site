'use client';

import { Flex, HStack } from '@chakra-ui/react';

import Header from './Header';
import SideBar from './SideBar';
import { useEffect, useState } from 'react';
import CountDownTimer from './CountDownTimer';
import CompanyPageHeader from '~/lib/components/CompanyManagement/CompanyPageHeader';
import Notes from './Notes';
import { getSession, useSession } from 'next-auth/react';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import useSignalR from '~/lib/hooks/useSignalR';
import { ROLE_IDS_ENUM } from '~/lib/utils/constants';
import { handleSignOutClient } from '~/lib/utils/handleSignOutClient';
import JourneyGuide, {
  CMFJourneyGuideSteps,
  journeyGuideSteps,
} from '~/lib/components/CompanyManagement/JourneyGuide';
import { useGetCompanyJourneyGuideQuery } from '~/lib/redux/services/company.services';
import { CompanyJourneyGuide } from '~/lib/interfaces/company.interfaces';
import { usePathname } from 'next/navigation';
import ImminentFailureAlertList from '~/lib/components/Notification/AlertBanners/ImminentFailureAlert';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showJourneyGuide, setShowJourneyGuide] = useState(false);
  const { data } = useSession();
  const { data: journeyGuideData } = useGetCompanyJourneyGuideQuery(
    { companyId: data?.user?.companyId! },
    { skip: !data?.user }
  );
  const pathName = usePathname();
  const companySlug = data?.user?.companySlug;
  const finalPathName = companySlug
    ? pathName?.replace(`/${companySlug}`, '')
    : pathName;

  const steps = [
    ...(data?.user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY)
      ? CMFJourneyGuideSteps
      : journeyGuideSteps),
  ];

  //Session timeout check
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    (async () => {
      const session = await getSession();

      if (!session?.expires) return;

      const expiryMs = new Date(session.expires).getTime();
      const nowMs = Date.now();

      // Sign out 60 seconds before actual expiry so I can still get the tenant name from the session
      const msUntilSignOut = Math.max(expiryMs - nowMs - 60_000, 0);

      timeout = setTimeout(() => {
        handleSignOutClient();
      }, msUntilSignOut);
    })();

    return () => clearTimeout(timeout);
  }, []);

  // Journey Guide check
  useEffect(() => {
    if (journeyGuideData?.data) {
      const hasIncompleteStep = steps.findIndex(
        (step) => !journeyGuideData?.data[step.key as keyof CompanyJourneyGuide]
      );
      if (
        hasIncompleteStep !== -1 &&
        finalPathName !== steps?.[hasIncompleteStep]?.link
      ) {
        setShowJourneyGuide(true);
      }
    }
  }, [journeyGuideData]);

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
    <>
      <Flex
        width="full"
        height="100vh"
        bgColor="#D9D9D9"
        overflowY="scroll"
        position="relative"
        overflowX="hidden"
      >
        <Notes isCollapse={isCollapse} />
        {showCountdown && <CountDownTimer />}

        <HStack position="relative">
          <SideBar isCollapse={isCollapse} setIsCollapse={setIsCollapse} />

          {/* {!isCollapse && (
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
        )} */}
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
      {(data?.user?.roleIds.includes(ROLE_IDS_ENUM.CLIENT_ADMIN) ||
        data?.user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY)) && (
        <JourneyGuide isOpen={showJourneyGuide} onClose={() => {}} />
      )}
      <ImminentFailureAlertList />
    </>
  );
};

export default ProtectedLayout;
