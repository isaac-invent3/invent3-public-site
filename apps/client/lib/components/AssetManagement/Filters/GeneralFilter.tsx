import { FilterInput } from '~/lib/interfaces/asset/general.interface';
import CategoryFilter from './FilterComponents/CategoryFilter';
import StatusFilter from './FilterComponents/StatusFilter';
import { Option } from '~/lib/interfaces/general.interfaces';
import CombinedLocationFilter from '../../Common/FilterComponents/CombinedLocationFilter';
import FilterWrapper from '../../Common/FilterComponents/FilterWrapper';

interface GeneralFilterProps {
  columnType?: string;
  filterData: FilterInput;
  setFilterData: React.Dispatch<React.SetStateAction<FilterInput>>;
  onApply: () => void;
  onClear: () => void;
}

type FilterLabel = keyof FilterInput;

const GeneralFilter = (props: GeneralFilterProps) => {
  const { onApply, onClear, filterData, setFilterData, columnType } = props;

  const handleFilterData = (option: Option, filterLabel: FilterLabel) => {
    const newValue =
      filterData[filterLabel].find((item) => item.value === option?.value) !==
      undefined
        ? filterData[filterLabel].filter((item) => item.value !== option?.value)
        : [...filterData[filterLabel], option];

    setFilterData((prev) => ({ ...prev, [filterLabel]: newValue }));
  };

  return (
    <FilterWrapper handleApplyFilter={onApply} handleClearFilter={onClear}>
      {columnType !== 'Category' && (
        <CategoryFilter
          selectedOptions={filterData.category}
          handleSelectedOption={(value) => handleFilterData(value, 'category')}
        />
      )}
      <CombinedLocationFilter
        selectedRegion={filterData.region}
        selectedArea={filterData.area}
        selectedBranch={filterData.branch}
        handleSelectedOption={handleFilterData}
      />
      {columnType !== 'AssetStatus' && (
        <StatusFilter
          selectedOptions={filterData.status}
          handleSelectedOption={(value) => handleFilterData(value, 'status')}
        />
      )}
    </FilterWrapper>
  );
};

export default GeneralFilter;
