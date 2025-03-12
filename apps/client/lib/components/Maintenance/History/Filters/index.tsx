import CombinedLocationFilter from '~/lib/components/Common/FilterComponents/CombinedLocationFilter';
import FilterWrapper from '~/lib/components/Common/FilterComponents/FilterWrapper';
import { Option } from '~/lib/interfaces/general.interfaces';
import { ScheduleFilter } from '~/lib/interfaces/maintenance.interfaces';
import { initialFilterData } from '..';
import DateRangeFilter from '~/lib/components/Common/DateRangeFilter';
import { isArray } from 'lodash';
import moment from 'moment';
import PlanTypeFilter from '../../Plans/Filters/PlanTypeFilter';
import MaintenanceTypeFilter from './MaintenanceTypeFilter';

interface FiltersProps {
  filterData: ScheduleFilter;
  setFilterData: React.Dispatch<React.SetStateAction<ScheduleFilter>>;
  handleApplyFilter: () => Promise<void>;
}
const Filters = (props: FiltersProps) => {
  const { filterData, setFilterData, handleApplyFilter } = props;

  type FilterLabel = keyof ScheduleFilter;

  const handleFilterData = (option: Option, filterLabel: FilterLabel) => {
    setFilterData((prev) => {
      if (isArray(prev[filterLabel])) {
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
      } else {
        return {
          ...prev,
        };
      }
    });
  };
  return (
    <FilterWrapper
      handleApplyFilter={handleApplyFilter}
      handleClearFilter={() => setFilterData(initialFilterData)}
    >
      <PlanTypeFilter
        selectedOptions={filterData.planType}
        handleSelectedOption={(value) => handleFilterData(value, 'planType')}
      />
      <MaintenanceTypeFilter
        selectedOptions={filterData.planType}
        handleSelectedOption={(value) =>
          handleFilterData(value, 'maintenanceType')
        }
      />
      <CombinedLocationFilter
        selectedRegion={filterData.region}
        selectedArea={filterData.area}
        selectedBranch={filterData.branch}
        handleSelectedOption={handleFilterData}
      />
      <DateRangeFilter
        fromDate={
          filterData.scheduleDate
            ? moment(filterData.scheduleDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
            : undefined
        }
        toDate={
          filterData.completionDate
            ? moment(filterData.completionDate, 'YYYY-MM-DD').format(
                'DD/MM/YYYY'
              )
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
      />
    </FilterWrapper>
  );
};

export default Filters;
