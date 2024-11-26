import React from 'react';
import CombinedLocationFilter from '~/lib/components/Common/FilterComponents/CombinedLocationFilter';
import FilterWrapper from '~/lib/components/Common/FilterComponents/FilterWrapper';
import { LocationFilter, Option } from '~/lib/interfaces/general.interfaces';
import { initialFilterData } from '..';

interface FiltersProps {
  filterData: LocationFilter;
  setFilterData: React.Dispatch<React.SetStateAction<LocationFilter>>;
  handleApplyFilter: () => Promise<void>;
}
const Filters = (props: FiltersProps) => {
  const { filterData, setFilterData, handleApplyFilter } = props;

  type FilterLabel = keyof LocationFilter;

  const handleFilterData = (option: Option, filterLabel: FilterLabel) => {
    setFilterData((prev) => {
      const selectedFilterData = [...prev[filterLabel]];

      const optionIndex = selectedFilterData.find(
        (item) => item.value === option.value
      );

      if (optionIndex) {
        // Remove the value if it already exists
        return {
          ...prev,
          [filterLabel]: selectedFilterData.filter(
            (item) => item.value !== option.value
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
    <FilterWrapper
      handleApplyFilter={handleApplyFilter}
      handleClearFilter={() => setFilterData(initialFilterData)}
    >
      <CombinedLocationFilter
        selectedRegion={filterData.region}
        selectedArea={filterData.area}
        selectedBranch={filterData.branch}
        handleSelectedOption={handleFilterData}
      />
    </FilterWrapper>
  );
};

export default Filters;
