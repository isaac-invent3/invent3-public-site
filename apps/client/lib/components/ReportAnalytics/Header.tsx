import { HStack, Icon, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { AddIcon } from '../CustomIcons';
import GenericBreadCrumb from '../UI/BreadCrumb';
import PageHeader from '../UI/PageHeader';

const breadCrumbData = [
  {
    label: 'Dashboard',
    route: '/',
  },
  {
    label: 'Report & Analytics',
    route: '#',
  },
];

const Header = ({
  showGenerate = true,
  header,
}: {
  showGenerate?: boolean;
  header?: string;
}) => {
  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack width="full" justifyContent="space-between">
        <PageHeader>{header ?? 'Reports & Analytics'}</PageHeader>

        {showGenerate && (
          <Button
            customStyles={{ width: '227px' }}
            href="/report-analytics/generate"
          >
            <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
            Generate a Report
          </Button>
        )}
      </HStack>
    </VStack>
  );
};

export default Header;
