import { HStack, Icon, VStack } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AddIcon } from '~/lib/components/CustomIcons';
import GenericBreadCrumb from '~/lib/components/UI/BreadCrumb';
import Button from '~/lib/components/UI/Button';
import PageHeader from '~/lib/components/UI/PageHeader';
import PlanButtonPopover from './PlanButton';

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
  const searchParams = useSearchParams();
  const [isPlan, setIsPlan] = useState(false);

  // Retrieve the `tab` parameter from URL on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'Plans' || !tab) {
      setIsPlan(true);
    } else {
      setIsPlan(false);
    }
  }, [searchParams]);

  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack width="full" justifyContent="space-between">
        <PageHeader>Maintenance</PageHeader>
        {isPlan ? (
          <PlanButtonPopover />
        ) : (
          name && (
            <Button
              customStyles={{ width: '227px' }}
              href={href}
              handleClick={handleClick}
            >
              <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
              Add New {name}
            </Button>
          )
        )}
      </HStack>
    </VStack>
  );
};

export default Header;
