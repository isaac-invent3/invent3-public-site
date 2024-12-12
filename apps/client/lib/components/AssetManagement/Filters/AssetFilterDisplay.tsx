import FilterDisplay from '../../UI/Filter/FilterDisplay';
import BulkActions from './BulkActions';
import GeneralFilter from './GeneralFilter';

interface AssetFilterDisplayProps {
  isOpen: boolean;
  activeFilter: 'bulk' | 'general' | null;
  handleApplyFilter: () => Promise<void>;
}
const AssetFilterDisplay = (props: AssetFilterDisplayProps) => {
  const { isOpen, activeFilter, handleApplyFilter } = props;
  return (
    <FilterDisplay isOpen={isOpen}>
      {activeFilter === 'bulk' && <BulkActions />}
      {activeFilter === 'general' && (
        <GeneralFilter handleApplyFilter={handleApplyFilter} />
      )}
    </FilterDisplay>
  );
};

export default AssetFilterDisplay;
