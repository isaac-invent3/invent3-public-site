import { FilterDisplay } from '@repo/ui/components';
import Filters from './Filters';
import { ActionType } from '~/lib/interfaces/general.interfaces';
import { UserFilter } from '~/lib/interfaces/user.interfaces';
import React from 'react';

interface UserActionDisplayProps {
  isOpen: boolean;
  activeAction: ActionType;
  filterData: UserFilter;
  setFilterData: React.Dispatch<React.SetStateAction<UserFilter>>;
  onApply: () => void;
  onClear: () => void;
}
const UserActionDisplay = (props: UserActionDisplayProps) => {
  const { isOpen, activeAction, onApply, onClear, filterData, setFilterData } =
    props;
  return (
    <FilterDisplay isOpen={isOpen}>
      {activeAction === 'filter' && (
        <Filters
          filterData={filterData}
          setFilterData={setFilterData}
          onApply={onApply}
          onClear={onClear}
        />
      )}
    </FilterDisplay>
  );
};

export default UserActionDisplay;
