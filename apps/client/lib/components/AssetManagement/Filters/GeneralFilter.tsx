import { FilterInput } from '~/lib/interfaces/asset.interfaces';
import CategoryFilter from './FilterComponents/CategoryFilter';
import StatusFilter from './FilterComponents/StatusFilter';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  clearAssetFilter,
  updateAssetFilter,
} from '~/lib/redux/slices/AssetSlice';
import { Option } from '~/lib/interfaces/general.interfaces';
import CombinedLocationFilter from '../../Common/FilterComponents/CombinedLocationFilter';
import FilterWrapper from '../../Common/FilterComponents/FilterWrapper';

interface GeneralFilterProps {
  handleApplyFilter: () => Promise<void>;
}

type FilterLabel = keyof FilterInput;

const GeneralFilter = (props: GeneralFilterProps) => {
  const { handleApplyFilter } = props;
  const filterData = useAppSelector((state) => state.asset.assetFilter);
  const dispatch = useAppDispatch();

  const handleFilterData = (option: Option, filterLabel: FilterLabel) => {
    const newValue =
      filterData[filterLabel].find((item) => item.value === option.value) !==
      undefined
        ? filterData[filterLabel].filter((item) => item.value !== option.value)
        : [...filterData[filterLabel], option];

    dispatch(updateAssetFilter({ [filterLabel]: newValue }));
  };

  return (
    <FilterWrapper
      handleApplyFilter={handleApplyFilter}
      handleClearFilter={() => dispatch(clearAssetFilter())}
    >
      <CategoryFilter
        selectedOptions={filterData.category}
        handleSelectedOption={(value) => handleFilterData(value, 'category')}
      />
      <CombinedLocationFilter
        selectedRegion={filterData.region}
        selectedArea={filterData.area}
        selectedBranch={filterData.branch}
        handleSelectedOption={handleFilterData}
      />
      <StatusFilter
        selectedOptions={filterData.status}
        handleSelectedOption={(value) => handleFilterData(value, 'status')}
      />
    </FilterWrapper>
  );
};

export default GeneralFilter;
