import { HStack, VStack } from '@chakra-ui/react';

import { GenericBreadCrumb } from '@repo/ui/components';
import PageHeader from '~/lib/components/UI/PageHeader';

interface HeaderProps {
  headingText: string;
  breadCrumbText?: string;
}
const Header = (props: HeaderProps) => {
  const { headingText, breadCrumbText } = props;

  const breadCrumbData = [
    {
      label: 'Dashboard',
      route: '/',
    },
    {
      label: 'Maintenance',
      route: '/maintenance',
    },
    {
      label: breadCrumbText ?? headingText,
      route: '#',
    },
  ];
  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <PageHeader>{headingText}</PageHeader>
      </HStack>
    </VStack>
  );
};

export default Header;
