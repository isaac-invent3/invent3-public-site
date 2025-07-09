import { FilterDisplay } from '@repo/ui/components';
import Filters from './Filters';
import { ActionType } from '~/lib/interfaces/general.interfaces';
import React from 'react';
import { VendorFilter } from '~/lib/interfaces/vendor.interfaces';

interface VendorActionProps {
  isOpen: boolean;
  activeAction: ActionType;
  filterData: VendorFilter;
  setFilterData: React.Dispatch<React.SetStateAction<VendorFilter>>;
  handleApplyFilter: () => void;
}
const VendorAction = (props: VendorActionProps) => {
  const { isOpen, activeAction, handleApplyFilter, filterData, setFilterData } =
    props;
  return (
    <FilterDisplay isOpen={isOpen}>
      {activeAction === 'filter' && (
        <Filters
          handleApplyFilter={handleApplyFilter}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      )}
    </FilterDisplay>
  );
};

export default VendorAction;
