import { HStack } from '@chakra-ui/react';
import React from 'react';
import Button from '../../UI/Button';

interface FilterWrapperProps {
  children: React.ReactNode;
  handleApplyFilter: () => void;
  handleClearFilter: () => void;
}
const FilterWrapper = (props: FilterWrapperProps) => {
  const { children, handleApplyFilter, handleClearFilter } = props;

  return (
    <HStack spacing="7px" overflow="auto">
      {children}
      <Button
        customStyles={{ minW: '120px', height: '36px' }}
        handleClick={() => handleApplyFilter()}
      >
        Apply Filter
      </Button>
      <Button
        variant="outline"
        customStyles={{ minW: '120px', height: '36px' }}
        handleClick={() => {
          handleClearFilter();
          handleApplyFilter();
        }}
      >
        Reset Filter
      </Button>
    </HStack>
  );
};

export default FilterWrapper;
