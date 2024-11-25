import React from 'react';
import FilterDisplay from '../../UI/Filter/FilterDisplay';
import { FilterInput } from '~/lib/interfaces/asset.interfaces';
import BulkActions from './BulkActions';
import GeneralFilter from './GeneralFilter';

interface AssetFilterDisplayProps {
  isOpen: boolean;
  activeFilter: 'bulk' | 'general' | null;
  filterData: FilterInput;
  setFilterData: React.Dispatch<React.SetStateAction<FilterInput>>;
}
const ReportFilterDisplay = (props: AssetFilterDisplayProps) => {
  const { isOpen, activeFilter, filterData, setFilterData } = props;
  return (
    <FilterDisplay isOpen={isOpen}>
      {activeFilter === 'bulk' && <BulkActions />}
      {activeFilter === 'general' && (
        <GeneralFilter filterData={filterData} setFilterData={setFilterData} />
      )}
    </FilterDisplay>
  );
};

export default AssetFilterDisplay;
