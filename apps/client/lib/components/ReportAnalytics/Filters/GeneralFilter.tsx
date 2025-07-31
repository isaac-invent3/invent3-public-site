import { HStack } from '@chakra-ui/react';

import CombinedLocationFilter from '~/lib/components/Common/FilterComponents/CombinedLocationFilter';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  resetReportFilters,
  updateReportFilters,
} from '~/lib/redux/slices/ReportSlice';
import FilterWrapper from '../../Common/FilterComponents/FilterWrapper';
import DateRangeFilter from '../../Common/DateRangeFilter';
import { ReportFilterInput } from '~/lib/interfaces/report.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';

const getTodayDate = () => {
  return dateFormatter(new Date(), 'DD/MM/YYYY') as string;
};

const initialState = {
  region: [],
  area: [],
  branch: [],
  fromDate: getTodayDate(),
  toDate: getTodayDate(),
};

interface GeneralFilterProps {
  setFinalFilters: React.Dispatch<React.SetStateAction<ReportFilterInput>>;
}
const GeneralFilter = ({ setFinalFilters }: GeneralFilterProps) => {
  const { filters } = useAppSelector((state) => state.report);
  const dispatch = useAppDispatch();

  return (
    <HStack spacing="7px" mt="42px">
      <FilterWrapper
        handleApplyFilter={() => setFinalFilters(filters)}
        handleClearFilter={() => {
          dispatch(resetReportFilters());
          setFinalFilters(initialState);
        }}
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
            dispatch(
              updateReportFilters({
                filterLabel: 'toDate',
                option: option.toDate,
              })
            );
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
