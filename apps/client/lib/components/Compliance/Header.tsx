import { HStack, Icon, Stack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import PageHeader from '../UI/PageHeader';
import { Button } from '@repo/ui/components';
import { AddIcon } from '../CustomIcons';
import CreateAssetComplianceDrawer from './Drawers/CreateComplianceDrawer';
import ComplianceTypeDrawer from './Drawers/ComplianceTypeDrawer';

const Header = ({
  showComplianceType = true,
  children,
}: {
  showComplianceType?: boolean;
  children?: React.ReactNode;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenComplianceType,
    onOpen: onOpenComplianceType,
    onClose: onCloseComplianceType,
  } = useDisclosure();
  return (
    <>
      <Stack
        width="full"
        justifyContent="space-between"
        direction={{ base: 'column', md: 'row' }}
        spacing="10px"
      >
        <PageHeader>Compliance Management</PageHeader>
        <HStack spacing="24px">
          {showComplianceType && (
            <Button
              customStyles={{
                width: '184px',
                height: { base: '36px', md: 'min-content' },
                alignSelf: 'end',
              }}
              variant="outline"
              handleClick={onOpenComplianceType}
            >
              Compliance Type
            </Button>
          )}
          {children}
          <Button
            handleClick={onOpen}
            customStyles={{
              width: '184px',
              height: { base: '36px', md: 'min-content' },
              alignSelf: 'end',
            }}
          >
            <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
            Assign Compliance
          </Button>
        </HStack>
      </Stack>
      {isOpen && (
        <CreateAssetComplianceDrawer isOpen={isOpen} onClose={onClose} />
      )}
      {isOpenComplianceType && (
        <ComplianceTypeDrawer
          isOpen={isOpenComplianceType}
          onClose={onCloseComplianceType}
        />
      )}
    </>
  );
};

export default Header;
