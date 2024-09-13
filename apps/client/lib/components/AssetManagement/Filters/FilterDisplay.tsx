import { Collapse, Flex } from '@chakra-ui/react';
import React from 'react';
import BulkActions from './BulkActions';
import { FilterInput } from '~/lib/interfaces/asset.interfaces';
import GeneralFilter from './GeneralFilter';

interface FilterDisplayProps {
  isOpen: boolean;
  activeFilter: 'bulk' | 'general' | null;
  filterData: FilterInput;
  setFilterData: React.Dispatch<React.SetStateAction<FilterInput>>;
}
const FilterDisplay = (props: FilterDisplayProps) => {
  const { isOpen, activeFilter, filterData, setFilterData } = props;
  return (
    <Collapse
      startingHeight={0}
      in={isOpen}
      transition={{ enter: { duration: 0.7 } }}
    >
      <Flex mt="16px" width="full" gap="56px">
        {activeFilter === 'bulk' && <BulkActions />}
        {activeFilter === 'general' && (
          <GeneralFilter
            filterData={filterData}
            setFilterData={setFilterData}
          />
        )}
      </Flex>
    </Collapse>
  );
};

export default FilterDisplay;
