'use client';
import {
  DrawerBody,
  DrawerHeader,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import SecurityTab from './SecurityTab';
import GeneralTab from './GeneralTab';
import Notification from './Notification';
import Teams from './Teams';
import PageHeader from '../UI/PageHeader';
import { useGetUserConfigurationOptionsQuery } from '~/lib/redux/services/user.services';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '~/lib/redux/hooks';
import { setInitialOptions } from '~/lib/redux/slices/UserSlice';
import { BackButton, GenericDrawer } from '@repo/ui/components';

const ALlTabs = ['Security', 'Notification', 'Teams', 'General'];

interface UserSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}
const UserSettings = (props: UserSettingsProps) => {
  const { isOpen, onClose } = props;
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);
  const session = useSession();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetUserConfigurationOptionsQuery(
    { userId: session?.data?.user?.userId!, pageSize: 30 },
    { skip: !session?.data?.user?.userId }
  );

  useEffect(() => {
    if (data?.data) {
      dispatch(
        setInitialOptions(
          data?.data?.items.map((item) => ({
            userConfigurationOptionId: item.userConfigurationOptionId,
            systemConfigurationOptionId: item.systemConfigurationOptionId,
          }))
        )
      );
    }
  }, [data]);

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="690px">
      <DrawerHeader
        p={0}
        m={0}
        px={{ base: '16px', md: '18px' }}
        pb="16px"
        bgColor="#EAEAEA"
      >
        <BackButton
          handleClick={onClose}
          customStyles={{ mt: '21px', mb: '8px' }}
        />
      </DrawerHeader>

      <DrawerBody
        p={0}
        m={0}
        position="relative"
        bgColor="#EAEAEA"
        px={{ base: '16px', md: '18px' }}
      >
        <Flex mt={{ base: '24px', md: '52px' }}>
          <PageHeader>Settings</PageHeader>
        </Flex>
        <Tabs
          variant="custom"
          width={'full'}
          onChange={(index) => setTabIndex(index)}
          index={tabIndex}
          mt="51px"
          opacity={isLoading ? 0.5 : 1}
          pointerEvents={isLoading ? 'none' : 'initial'}
          pb="24px"
        >
          <Flex width="full" px={{ base: '16px', md: 0 }}>
            <TabList>
              {ALlTabs.map((item, index) => (
                <Tab key={index} width="93px">
                  {item}
                </Tab>
              ))}
            </TabList>
          </Flex>
          <TabPanels pt="16px">
            <TabPanel>{tabIndex === 0 && <SecurityTab />}</TabPanel>
            <TabPanel>{tabIndex === 1 && <Notification />}</TabPanel>
            <TabPanel>{tabIndex === 2 && <Teams />}</TabPanel>
            <TabPanel>{tabIndex === 3 && <GeneralTab />}</TabPanel>
          </TabPanels>
        </Tabs>
      </DrawerBody>
    </GenericDrawer>
  );
};

export default UserSettings;
