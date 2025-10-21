import CombinedLocationFilter from '~/lib/components/Common/FilterComponents/CombinedLocationFilter';
import FilterWrapper from '~/lib/components/Common/FilterComponents/FilterWrapper';
import { initialFilterData } from '..';
import { TaskFilter } from '~/lib/interfaces/task.interfaces';
import { Option } from '~/lib/interfaces/general.interfaces';
import UsersFilter from '~/lib/components/Common/FilterComponents/UsersFilter';

interface FiltersProps {
  filterData: TaskFilter;
  setFilterData: React.Dispatch<React.SetStateAction<TaskFilter>>;
  onApply: () => void;
  onClear: () => void;
}
const GeneralFilter = (props: FiltersProps) => {
  const { filterData, setFilterData, onApply, onClear } = props;

  type FilterLabel = keyof TaskFilter;

  const handleFilterData = (option: Option, filterLabel: FilterLabel) => {
    setFilterData((prev) => {
      const selectedFilterData = [...prev[filterLabel]];

      const optionIndex = selectedFilterData.find(
        (item) => item.value === option?.value
      );

      if (optionIndex) {
        // Remove the value if it already exists
        return {
          ...prev,
          [filterLabel]: selectedFilterData.filter(
            (item) => item.value !== option?.value
          ),
        };
      } else {
        // Add the value if it does not exist
        return {
          ...prev,
          [filterLabel]: [...selectedFilterData, option],
        };
      }
    });
  };
  return (
    <FilterWrapper handleApplyFilter={onApply} handleClearFilter={onClear}>
      <UsersFilter
        selectedOptions={filterData.users.map((item) => ({
          value: item.value,
          label: item.label,
        }))}
        handleSelectedOption={(value) => handleFilterData(value, 'users')}
      />
      <CombinedLocationFilter
        selectedRegion={filterData.region}
        selectedArea={filterData.area}
        selectedBranch={filterData.branch}
        handleSelectedOption={handleFilterData}
      />
    </FilterWrapper>
  );
};

export default GeneralFilter;
