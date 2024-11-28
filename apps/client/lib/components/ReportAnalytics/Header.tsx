import { HStack, Icon, VStack } from '@chakra-ui/react';
import { AddIcon } from '../CustomIcons';
import GenericBreadCrumb from '../UI/BreadCrumb';
import PrimaryButton from '../UI/Button';
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

const Header = () => {
  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack width="full" justifyContent="space-between">
        <PageHeader>Reports & Analytics</PageHeader>
        <PrimaryButton
          customStyles={{ width: '227px' }}
          href="/report-analytics/add"
        >
          <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
          Generate a Report
        </PrimaryButton>
      </HStack>
    </VStack>
  );
};

export default Header;
