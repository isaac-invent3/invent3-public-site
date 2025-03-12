import { HStack } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';

interface FilterWrapperProps {
  children: React.ReactNode;
  handleApplyFilter: () => void;
  handleClearFilter: () => void;
}
const FilterWrapper = (props: FilterWrapperProps) => {
  const { children, handleApplyFilter, handleClearFilter } = props;

  return (
    <HStack spacing="7px" overflow="auto" flexWrap='wrap'>
      {children}
      <Button
        customStyles={{ minW: '120px', width: 'max-content', height: '36px' }}
        handleClick={() => handleApplyFilter()}
      >
        Apply Filter
      </Button>
      <Button
        variant="outline"
        customStyles={{ minW: '120px', width: 'max-content', height: '36px' }}
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
