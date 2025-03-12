import { FilterDisplay } from '@repo/ui/components';
import { LocationFilter } from '~/lib/interfaces/general.interfaces';
import BulkActions from './BulkFilters';
import GeneralFilter from './GeneralFilter';

interface FiltersProps {
  filterData: LocationFilter;
  setFilterData: React.Dispatch<React.SetStateAction<LocationFilter>>;
  handleApplyFilter: () => Promise<void>;
  isOpen: boolean;
  activeFilter: 'bulk' | 'general' | null;
  selectedTaskIds:number[]
}
const Filters = (props: FiltersProps) => {
  const {
    filterData,
    setFilterData,
    handleApplyFilter,
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
          handleApplyFilter={handleApplyFilter}
        />
      )}
    </FilterDisplay>
  );
};

export default Filters;
