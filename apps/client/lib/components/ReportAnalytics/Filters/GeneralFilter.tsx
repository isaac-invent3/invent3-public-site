import { HStack } from '@chakra-ui/react';

import CombinedLocationFilter from '~/lib/components/Common/FilterComponents/CombinedLocationFilter';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  resetReportFilters,
  updateReportFilters,
} from '~/lib/redux/slices/ReportSlice';
import FilterWrapper from '../../Common/FilterComponents/FilterWrapper';
import DateRangeFilter from '../../Common/DateRangeFilter';

const GeneralFilter = () => {
  const { filters } = useAppSelector((state) => state.report);
  const dispatch = useAppDispatch();

  return (
    <HStack spacing="7px" mt="42px">
      <FilterWrapper
        handleApplyFilter={() => {}}
        handleClearFilter={() => dispatch(resetReportFilters())}
      >
        <DateRangeFilter
          fromDate={filters.fromDate}
          toDate={filters.toDate}
          handleSelectedOption={(option) => {
            dispatch(
              updateReportFilters({
                filterLabel: 'fromDate',
                option: option.fromDate,
              })
            );
            updateReportFilters({
              filterLabel: 'toDate',
              option: option.toDate,
            });
          }}
        />
        <CombinedLocationFilter
          selectedRegion={filters.region}
          selectedArea={filters.area}
          selectedBranch={filters.branch}
          handleSelectedOption={(option, key) => {
            dispatch(updateReportFilters({ filterLabel: key, option }));
          }}
        />
      </FilterWrapper>
    </HStack>
  );
};

export default GeneralFilter;
