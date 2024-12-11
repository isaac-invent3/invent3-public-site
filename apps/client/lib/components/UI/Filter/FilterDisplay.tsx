import { Collapse, Flex } from '@chakra-ui/react';

interface FilterDisplayProps {
  isOpen: boolean;
  children: React.ReactNode;
}
const FilterDisplay = (props: FilterDisplayProps) => {
  const { isOpen, children } = props;
  return (
    <Collapse
      startingHeight={0}
      in={isOpen}
      transition={{ enter: { duration: 0 } }}
    >
      <Flex width="full" gap="56px">
        {children}
      </Flex>
    </Collapse>
  );
};

export default FilterDisplay;
