import { HStack, Icon, Stack } from '@chakra-ui/react';
import React from 'react';
import PageHeader from '../UI/PageHeader';
import { Button } from '@repo/ui/components';
import { AddIcon } from '../CustomIcons';

const Header = ({
  showComplianceType = false,
}: {
  showComplianceType?: boolean;
}) => {
  return (
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
          >
            Compliance Type
          </Button>
        )}
        <Button
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
  );
};

export default Header;
