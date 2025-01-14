import { HStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React from 'react';
import PageHeader from '~/lib/components/UI/PageHeader';

const DetailHeader = () => {
  return (
    <HStack
      width="full"
      justifyContent="space-between"
      pb="16px"
      borderBottomWidth="1px"
      borderColor="neutral.300"
    >
      <PageHeader>Template Detail</PageHeader>
      <HStack spacing="8px">
        <Button
          customStyles={{ height: '35px', width: '117px', px: '8px' }}
          variant="primary"
        >
          Edit Template
        </Button>
        <Button
          customStyles={{ height: '35px', width: '117px', px: '8px' }}
          variant="secondary"
        >
          Delete Template
        </Button>
      </HStack>
    </HStack>
  );
};

export default DetailHeader;
