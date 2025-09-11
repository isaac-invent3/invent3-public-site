import {
  Flex,
  HStack,
  Skeleton,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FilterButton, SearchInput } from '@repo/ui/components';
import SectionWrapper from '~/lib/components/UserSettings/Common/SectionWrapper';
import { FilterIcon } from '~/lib/components/CustomIcons';
import { useGetAllThirdPartyIntegrationsQuery } from '~/lib/redux/services/integration.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import ThirdPartyDetailDrawer from './DetailDrawer';
import { useAppSelector } from '~/lib/redux/hooks';
import { useUpdateSettingsMutation } from '~/lib/redux/services/utility.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';

const ThirdParty = () => {
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  const { data, isLoading } = useGetAllThirdPartyIntegrationsQuery({
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const { handleSubmit } = useCustomMutation();
  const [updateSettings] = useUpdateSettingsMutation();
  const settings = useAppSelector((state) => state.settings.settings);
  const [isEnabled, setIsEnabled] = useState(
    settings?.enableThirdPartyIntegration
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleIntegrations = async (value: boolean) => {
    const session = await getSession();
    await handleSubmit(
      updateSettings,
      {
        enableThirdPartyIntegration: value,
        settingsId: settings?.settingId!,
        companyId: session?.user?.companyId!,
        lastModifiedBy: session?.user?.username!,
      },
      ''
    );
  };
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <HStack width="full" justifyContent="space-between">
        <Text fontWeight={700} size="lg">
          Third-Party Integrations
        </Text>
        <Switch
          size="sm"
          isChecked={isEnabled}
          onChange={() => {
            toggleIntegrations(!isEnabled);
            setIsEnabled((prev) => !prev);
          }}
        />
      </HStack>
      <VStack width="full" spacing="16px">
        <SectionWrapper
          title="Available Integrations"
          subtitle="Connect with powerful third-party tools"
          sectionInfoWidth="212px"
          spacing="16px"
          direction={{ base: 'column', md: 'row' }}
          sectionInfoStyle={{ maxW: { base: '60%', md: '212px' } }}
        >
          <HStack spacing="16px" flexWrap="wrap">
            <SearchInput setSearch={setSearch} width="187px" />
            <FilterButton
              handleClick={() => {}}
              isActive={false}
              label="Filters"
              icon={FilterIcon}
              bgColor="#F4F4F4"
            />
          </HStack>
        </SectionWrapper>
        <HStack width="full" justifyContent="flex-end">
          {isLoading &&
            Array(3)
              .fill('')
              .map((_, index) => (
                <Skeleton
                  width={{ base: '40px', lg: '74px' }}
                  height={{ base: '40px', lg: '74px' }}
                  rounded="6px"
                  key={index}
                />
              ))}

          {!isLoading &&
            data?.data?.items.map((item, index) => (
              <>
                <Flex
                  width={{ base: '60px', lg: '74px' }}
                  height={{ base: '60px', lg: '74px' }}
                  rounded="6px"
                  bgColor="neutral.100"
                  justifyContent="center"
                  alignItems="center"
                  key={index}
                  cursor="pointer"
                  onClick={onOpen}
                >
                  <Text
                    size={{ base: 'lg', lg: 'xl' }}
                    fontWeight={700}
                    color="black"
                  >
                    {item.integrationName}
                  </Text>
                </Flex>
                <ThirdPartyDetailDrawer
                  isOpen={isOpen}
                  onClose={onClose}
                  data={item}
                />
              </>
            ))}
        </HStack>
      </VStack>
    </VStack>
  );
};

export default ThirdParty;
