import { HStack, Icon, VStack } from '@chakra-ui/react';
import React from 'react';
import GenericBreadCrumb from '../UI/BreadCrumb';
import PageHeader from '../UI/PageHeader';
import PrimaryButton from '../UI/Button';
import { AddIcon } from '../CustomIcons';

const breadCrumbData = [
  {
    label: 'Dashboard',
    route: '/',
  },
  {
    label: 'Maintenance',
    route: '#',
  },
];

interface HeaderProps {
  name?: string;
  href?: string;
  handleClick?: () => void;
}
const Header = (props: HeaderProps) => {
  const { name, href, handleClick } = props;

  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack width="full" justifyContent="space-between">
        <PageHeader>Maintenance</PageHeader>
        {name && (
          <PrimaryButton
            customStyles={{ width: '227px' }}
            href={href}
            handleClick={handleClick}
          >
            <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
            Add New {name}
          </PrimaryButton>
        )}
      </HStack>
    </VStack>
  );
};

export default Header;
