import { Flex, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ChevronLeftIcon } from '../CustomIcons';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useRouter } from 'next/navigation';
import { setSelectedCompanyInfo } from '~/lib/redux/slices/GeneralSlice';
import { ROUTES } from '~/lib/utils/constants';
import { useSession } from 'next-auth/react';

const CompanyPageHeader = () => {
  const { data, update } = useSession();
  const selectedCompanyInfo = useAppSelector(
    (state) => state.general.selectedCompanyInfo
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  if (!selectedCompanyInfo || !data?.user.managedCompanySlug) {
    return null;
  }

  return (
    <VStack
      width="full"
      alignItems="flex-start"
      spacing="16px"
      mb={{ base: '16px', md: '28px' }}
    >
      <HStack
        width="full"
        py="12px"
        px="18px"
        bgColor="white"
        rounded="8px"
        spacing={{ base: '16px', lg: '37px' }}
      >
        <Flex
          width="57px"
          height="57px"
          rounded="8px"
          position="relative"
          shrink={0}
          bgColor={!selectedCompanyInfo?.base64Prefix ? 'neutral.100' : 'none'}
        >
          <Image
            src={
              selectedCompanyInfo?.base64Prefix
                ? `${selectedCompanyInfo?.base64Prefix}${selectedCompanyInfo?.photoImage}`
                : ''
            }
            fill
            alt="logo"
          />
        </Flex>
        <Heading color="black" fontWeight={700} size="lg">
          {selectedCompanyInfo?.name ?? ''}
        </Heading>
        <Text py="8px" px="16px" rounded="full" bgColor="neutral.300">
          {selectedCompanyInfo?.industryType ?? ''}
        </Text>
      </HStack>
      <HStack
        as="button"
        p={{ base: '17px' }}
        spacing="8px"
        rounded="8px"
        bgColor="#F6F6F666"
        alignItems="center"
        onClick={async () => {
          dispatch(setSelectedCompanyInfo(null));
          await update({
            user: {
              ...data?.user,
              managedCompanySlug: null,
            },
          });
          router.push(
            `/${ROUTES.COMPANY}/${selectedCompanyInfo.companyId}/details`
          );
        }}
      >
        <Icon as={ChevronLeftIcon} boxSize="16px" mb="4px" />
        <Text color="primary.500">Back to company Detail Page</Text>
      </HStack>
    </VStack>
  );
};

export default CompanyPageHeader;
