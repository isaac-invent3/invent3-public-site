'use client';
import { HStack, Stack, useDisclosure } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import PageHeader from '../../UI/PageHeader';
import { ROLE_IDS_ENUM, ROUTES } from '~/lib/utils/constants';
import { useAppSelector } from '~/lib/redux/hooks';
import ToggleCompanyStatusModal from '../Modals/ToggleCompanyStatusModal';
import { useSession } from 'next-auth/react';
import AssistantGuideBox from '../JourneyGuide/AssistantGuideBox';

const Header = () => {
  const company = useAppSelector((state) => state.company.company);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const session = useSession();
  const user = session?.data?.user;
  const isSuperAdmin =
    user?.roleIds.includes(ROLE_IDS_ENUM.SUPER_ADMIN) ?? false;
  if (!company) {
    return null;
  }

  return (
    <>
      <Stack
        width="full"
        direction={{ base: 'column', md: 'row' }}
        spacing="16px"
        justifyContent="space-between"
      >
        <PageHeader>Company Detail</PageHeader>
        <HStack spacing="8px" wrap="wrap">
          <AssistantGuideBox
            containerStyle={{ height: '60px', rounded: 'full' }}
          />
          <Button
            customStyles={{
              width: 'max-content',
              height: { base: '36px', md: 'min-content' },
            }}
            href={`/${ROUTES.COMPANY}/${company?.companyId}/edit`}
          >
            Edit Company
          </Button>
          {isSuperAdmin && (
            <Button
              variant="outline"
              customStyles={{
                width: 'max-content',
                height: { base: '36px', md: '50px' },
              }}
            >
              Manage Subscription
            </Button>
          )}
          <Button
            variant="secondary"
            customStyles={{
              width: 'max-content',
              height: { base: '36px', md: 'min-content' },
            }}
            handleClick={onOpen}
          >
            Deactivate
          </Button>
        </HStack>
      </Stack>
      <ToggleCompanyStatusModal
        isOpen={isOpen}
        onClose={onClose}
        company={company}
      />
    </>
  );
};

export default Header;
