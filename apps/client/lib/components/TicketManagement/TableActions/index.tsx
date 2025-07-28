import { FilterDisplay } from '@repo/ui/components';
import BulkActions from './BulkAction';
import Filters from './Filters';
import {
  TicketCategory,
  TicketFilter,
} from '~/lib/interfaces/ticket.interfaces';

interface TableActionsProps {
  filterData: TicketFilter;
  setFilterData: React.Dispatch<React.SetStateAction<TicketFilter>>;
  handleApplyFilter: () => void;
  isOpen: boolean;
  activeFilter: 'bulk' | 'general' | null;
  selectedTicketIds: number[];
  ticketCategory: TicketCategory;
}
const TableActions = (props: TableActionsProps) => {
  const {
    filterData,
    setFilterData,
    handleApplyFilter,
    activeFilter,
    isOpen,
    selectedTicketIds,
    ticketCategory,
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
          ticketCategory={ticketCategory}
        />
      )}
    </FilterDisplay>
  );
};

export default TableActions;
