'use client';
import { HStack, Stack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import PageHeader from '../../UI/PageHeader';
import { ROUTES } from '~/lib/utils/constants';
import { useAppSelector } from '~/lib/redux/hooks';

const Header = () => {
  const company = useAppSelector((state) => state.company.company);
  return (
    <Stack
      width="full"
      direction={{ base: 'column', md: 'row' }}
      spacing="16px"
      justifyContent="space-between"
    >
      <PageHeader>Company Detail</PageHeader>
      <HStack spacing="8px" wrap="wrap">
        <Button
          customStyles={{
            width: 'max-content',
            height: { base: '36px', md: 'min-content' },
          }}
          href={`/${ROUTES.COMPANY}/${company?.companyId}/edit`}
        >
          Edit Company
        </Button>
        <Button
          variant="outline"
          customStyles={{
            width: 'max-content',
            height: { base: '36px', md: 'min-content' },
          }}
        >
          Manage Subscription
        </Button>
        <Button
          variant="secondary"
          customStyles={{
            width: 'max-content',
            height: { base: '36px', md: 'min-content' },
          }}
        >
          Deactivate
        </Button>
      </HStack>
    </Stack>
  );
};

export default Header;
