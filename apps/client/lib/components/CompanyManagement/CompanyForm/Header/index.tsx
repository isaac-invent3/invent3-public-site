import { HStack } from '@chakra-ui/react';

import PageHeader from '~/lib/components/UI/PageHeader';

interface HeaderProps {
  type: 'create' | 'edit';
}
const Header = (props: HeaderProps) => {
  const { type } = props;

  return (
    <HStack
      width="full"
      justifyContent="space-between"
      alignItems="flex-start"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>
        {type === 'create' ? 'Add New Company' : 'Edit Company'}
      </PageHeader>
    </HStack>
  );
};

export default Header;
