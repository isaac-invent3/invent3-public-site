import { Icon, Stack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import { ROUTES } from '~/lib/utils/constants';
import { AddIcon } from '../CustomIcons';
import PageHeader from '../UI/PageHeader';

const Header = ({
  showGenerate = true,
  header,
}: {
  showGenerate?: boolean;
  header?: string;
}) => {
  const canGenerateReport = usePermissionAccess('report:generate');
  return (
    <Stack
      spacing="10px"
      justifyContent="space-between"
      direction={{ base: 'column', md: 'row' }}
      width="full"
      pt="12px"
    >
      <PageHeader>{header ?? 'Reports & Analytics'}</PageHeader>
      {showGenerate && canGenerateReport && (
        <Button
          customStyles={{
            width: '227px',
            height: { base: '36px', md: 'min-content' },
            alignSelf: 'end',
          }}
          href={`/${ROUTES.REPORT}/generate`}
        >
          <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
          Generate a Report
        </Button>
      )}
    </Stack>
  );
};

export default Header;
