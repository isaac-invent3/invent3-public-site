import { HStack } from '@chakra-ui/react';

import CombinedLocationFilter from '~/lib/components/Common/FilterComponents/CombinedLocationFilter';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  resetReportFilters,
  updateReportFilters,
} from '~/lib/redux/slices/ReportSlice';
import { ReportFilterInput } from '~/lib/interfaces/report.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import { useSession } from 'next-auth/react';
import { ROLE_IDS_ENUM } from '~/lib/utils/constants';
import DateRangeFilter from '~/lib/components/Common/DateRangeFilter';
import FilterWrapper from '~/lib/components/Common/FilterComponents/FilterWrapper';
import CompanyFilter from './CompanyFilter';

const getTodayDate = () => {
  return dateFormatter(new Date(), 'DD/MM/YYYY') as string;
};

const getFirstDayOfYear = () => {
  const now = new Date();
  return dateFormatter(
    new Date(now.getFullYear(), 0, 1),
    'DD/MM/YYYY'
  ) as string;
};

const initialState = {
  region: [],
  area: [],
  branch: [],
  companies: [],
  fromDate: getFirstDayOfYear(),
  toDate: getTodayDate(),
};

interface GeneralFilterProps {
  setFinalFilters: React.Dispatch<React.SetStateAction<ReportFilterInput>>;
}
const GeneralFilter = ({ setFinalFilters }: GeneralFilterProps) => {
  const { filters } = useAppSelector((state) => state.report);
  const dispatch = useAppDispatch();
  const session = useSession();

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
        {session?.data?.user?.roleIds.includes(ROLE_IDS_ENUM.CLIENT_ADMIN) && (
          <CombinedLocationFilter
            selectedRegion={filters.region}
            selectedArea={filters.area}
            selectedBranch={filters.branch}
            handleSelectedOption={(option, key) => {
              dispatch(updateReportFilters({ filterLabel: key, option }));
            }}
          />
        )}
        {session?.data?.user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY) && (
          <CompanyFilter
            selectedOptions={filters.companies}
            handleSelectedOption={(option) => {
              dispatch(
                updateReportFilters({ filterLabel: 'companies', option })
              );
            }}
          />
        )}
      </FilterWrapper>
    </HStack>
  );
};

export default GeneralFilter;
