import { FilterDisplay } from '@repo/ui/components';
import BulkActions from './BulkActions';
import GeneralFilter from './GeneralFilter';
import { FilterInput } from '~/lib/interfaces/asset/general.interface';

interface AssetFilterDisplayProps {
  isOpen: boolean;
  activeFilter: 'bulk' | 'general' | null;
  filterData: FilterInput;
  setFilterData: React.Dispatch<React.SetStateAction<FilterInput>>;
  onApply: () => void;
  onClear: () => void;
}
const AssetFilterDisplay = (props: AssetFilterDisplayProps) => {
  const { isOpen, activeFilter, onApply, onClear, setFilterData, filterData } =
    props;
  return (
    <FilterDisplay isOpen={isOpen}>
      {activeFilter === 'bulk' && <BulkActions />}
      {activeFilter === 'general' && (
        <GeneralFilter
          onApply={onApply}
          onClear={onClear}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      )}
    </FilterDisplay>
  );
};

export default AssetFilterDisplay;
