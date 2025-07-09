import { FilterDisplay } from '@repo/ui/components';
import { LocationFilter } from '~/lib/interfaces/general.interfaces';
import BulkActions from './BulkAction';
import Filters from './Filters';

interface TableActionsProps {
  filterData: LocationFilter;
  setFilterData: React.Dispatch<React.SetStateAction<LocationFilter>>;
  handleApplyFilter: () => void;
  isOpen: boolean;
  activeFilter: 'bulk' | 'general' | null;
  selectedTicketIds: number[];
}
const TableActions = (props: TableActionsProps) => {
  const {
    filterData,
    setFilterData,
    handleApplyFilter,
    activeFilter,
    isOpen,
    selectedTicketIds,
  } = props;

  return (
    <FilterDisplay isOpen={isOpen}>
      {activeFilter === 'bulk' && (
        <BulkActions selectedTicketIds={selectedTicketIds} />
      )}
      {activeFilter === 'general' && (
        <Filters
          filterData={filterData}
          setFilterData={setFilterData}
          handleApplyFilter={handleApplyFilter}
        />
      )}
    </FilterDisplay>
  );
};

export default TableActions;
