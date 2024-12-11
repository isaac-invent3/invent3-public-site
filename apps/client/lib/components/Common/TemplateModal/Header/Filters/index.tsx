import React from 'react';
import { HStack } from '@chakra-ui/react';
import OwnerFilter from './OwnerFilter';
import CreatedDate from './CreatedDate';
import { Button } from '@repo/ui/components';

const TemplateFilters = () => {
  return (
    <HStack spacing="8px" mt="8px" mb="16px">
      <CreatedDate />
      <OwnerFilter />
      <Button customStyles={{ width: 'max-content', height: '36px' }}>
        Apply
      </Button>
    </HStack>
  );
};

export default TemplateFilters;
