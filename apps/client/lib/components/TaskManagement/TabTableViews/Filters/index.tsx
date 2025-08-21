import { FilterDisplay } from '@repo/ui/components';
import BulkActions from './BulkFilters';
import GeneralFilter from './GeneralFilter';
import { TaskFilter } from '~/lib/interfaces/task.interfaces';

interface FiltersProps {
  filterData: TaskFilter;
  setFilterData: React.Dispatch<React.SetStateAction<TaskFilter>>;
  onApply: () => void;
  onClear: () => void;
  isOpen: boolean;
  activeFilter: 'bulk' | 'general' | null;
  selectedTaskIds: number[];
}
const Filters = (props: FiltersProps) => {
  const {
    filterData,
    setFilterData,
    onApply,
    onClear,
    activeFilter,
    isOpen,
    selectedTaskIds,
  } = props;

  return (
    <FilterDisplay isOpen={isOpen}>
      {activeFilter === 'bulk' && (
        <BulkActions selectedTaskIds={selectedTaskIds} />
      )}
      {activeFilter === 'general' && (
        <GeneralFilter
          filterData={filterData}
          setFilterData={setFilterData}
                onApply={onApply}
          onClear={onClear}
        />
      )}
    </FilterDisplay>
  );
};

export default Filters;
