import CombinedLocationFilter from '~/lib/components/Common/FilterComponents/CombinedLocationFilter';
import FilterWrapper from '~/lib/components/Common/FilterComponents/FilterWrapper';
import { Option } from '~/lib/interfaces/general.interfaces';
import { PlanFilter } from '~/lib/interfaces/maintenance.interfaces';
import { initialFilterData } from '..';
import PlanTypeFilter from './PlanTypeFilter';
import DateRangeFilter from '~/lib/components/Common/DateRangeFilter';
import { isArray } from 'lodash';
import moment from 'moment';

interface FiltersProps {
  filterData: PlanFilter;
  setFilterData: React.Dispatch<React.SetStateAction<PlanFilter>>;
  onApply: () => void;
  onClear: () => void;
}
const Filters = (props: FiltersProps) => {
  const { filterData, setFilterData, onApply, onClear } = props;

  type FilterLabel = keyof PlanFilter;

  const handleFilterData = (option: Option, filterLabel: FilterLabel) => {
    setFilterData((prev) => {
      if (isArray(prev[filterLabel])) {
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
      } else {
        return {
          ...prev,
        };
      }
    });
  };
  return (
    <FilterWrapper handleApplyFilter={onApply} handleClearFilter={onClear}>
      <PlanTypeFilter
        selectedOptions={filterData.planType}
        handleSelectedOption={(value) => handleFilterData(value, 'planType')}
      />
      {/* <CombinedLocationFilter
        selectedRegion={filterData.region}
        selectedArea={filterData.area}
        selectedBranch={filterData.branch}
        handleSelectedOption={handleFilterData}
      />
      <DateRangeFilter
        fromDate={
          filterData.startDate
            ? moment(filterData.startDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
            : undefined
        }
        toDate={
          filterData.endDate
            ? moment(filterData.endDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
            : undefined
        }
        handleSelectedOption={(option) => {
          setFilterData((prev) => ({
            ...prev,
            startDate: moment(option.fromDate, 'DD/MM/YYYY').format(
              'YYYY-MM-DD'
            ),
            endDate: moment(option.toDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          }));
        }}
      /> */}
    </FilterWrapper>
  );
};

export default Filters;
