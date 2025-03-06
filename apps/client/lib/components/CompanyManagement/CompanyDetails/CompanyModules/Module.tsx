import {
  ComponentWithAs,
  Flex,
  Icon,
  IconProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { setSelectedCompanyInfo } from '~/lib/redux/slices/GeneralSlice';

interface ModuleProps {
  name: string;
  route: string;
  icon: ComponentWithAs<'svg', IconProps>;
  description: string;
}
const Module = (props: ModuleProps) => {
  const { name, route, icon, description } = props;
  const company = useAppSelector((state) => state.company.company);
  const router = useRouter();
  const { data, update } = useSession();
  const dispatch = useAppDispatch();

  const handleModuleClick = async () => {
    if (company) {
      dispatch(
        setSelectedCompanyInfo({
          name: company.companyName,
          companyId: company.companyId,
          slug: 'test',
          logo: `${company?.base64Prefix}${company?.photoImage}`,
          industryType: company?.industryName,
        })
      );
      await update({
        user: {
          ...data?.user,
          managedCompanySlug: company.companyName,
        },
      });
      router.push(`/${route}`);
    }
  };

  return (
    <VStack
      width="full"
      alignItems="flex-start"
      spacing="16px"
      p="16px"
      bgColor="#EEEEEE"
      rounded="8px"
      cursor="pointer"
      onClick={handleModuleClick}
    >
      <VStack width="full" alignItems="flex-start" spacing="8px">
        <Flex
          width="32px"
          height="32px"
          bgColor="primary.500"
          rounded="full"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={icon} boxSize="18px" color="white" />
        </Flex>
        <Text size="lg" color="primary.500">
          {name}
        </Text>
      </VStack>
      <Text color="neutral.700" fontWeight={400}>
        {description}
      </Text>
    </VStack>
  );
};

export default Module;
