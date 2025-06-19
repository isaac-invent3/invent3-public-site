import { FilterDisplay } from '@repo/ui/components';
import { LocationFilter } from '~/lib/interfaces/general.interfaces';
import BulkActions from './BulkActions';

interface TableActionsProps {
  isOpen: boolean;
  activeFilter: 'bulk' | 'general' | null;
}
const TableActions = (props: TableActionsProps) => {
  const { activeFilter, isOpen } = props;

  return (
    <FilterDisplay isOpen={isOpen}>
      {activeFilter === 'bulk' && <BulkActions />}
    </FilterDisplay>
  );
};

export default TableActions;
