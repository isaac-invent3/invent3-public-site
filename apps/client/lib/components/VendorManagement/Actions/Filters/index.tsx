import FilterWrapper from '~/lib/components/Common/FilterComponents/FilterWrapper';
// import { Option } from '~/lib/interfaces/general.interfaces';
import DateRangeFilter from '~/lib/components/Common/DateRangeFilter';
// import { isArray } from 'lodash';
import moment from 'moment';
import { initialFilterData } from '../..';
import { UserFilter } from '~/lib/interfaces/user.interfaces';

interface FiltersProps {
  filterData: UserFilter;
  setFilterData: React.Dispatch<React.SetStateAction<UserFilter>>;
  handleApplyFilter: () => Promise<void>;
}
const Filters = (props: FiltersProps) => {
  const { filterData, setFilterData, handleApplyFilter } = props;

  // type FilterLabel = keyof UserFilter;

  // const handleFilterData = (option: Option, filterLabel: FilterLabel) => {
  //   setFilterData((prev) => {
  //     if (isArray(prev[filterLabel])) {
  //       const selectedFilterData = [...prev[filterLabel]];

  //       const optionIndex = selectedFilterData.find(
  //         (item) => item.value === option.value
  //       );

  //       if (optionIndex) {
  //         // Remove the value if it already exists
  //         return {
  //           ...prev,
  //           [filterLabel]: selectedFilterData.filter(
  //             (item) => item.value !== option.value
  //           ),
  //         };
  //       } else {
  //         // Add the value if it does not exist
  //         return {
  //           ...prev,
  //           [filterLabel]: [...selectedFilterData, option],
  //         };
  //       }
  //     } else {
  //       return {
  //         ...prev,
  //       };
  //     }
  //   });
  // };

  return (
    <FilterWrapper
      handleApplyFilter={handleApplyFilter}
      handleClearFilter={() => setFilterData(initialFilterData)}
    >
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
      />
    </FilterWrapper>
  );
};

export default Filters;
