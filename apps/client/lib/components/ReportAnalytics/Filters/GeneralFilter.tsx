import { HStack } from '@chakra-ui/react';
import React from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { TicketFilterInput } from '~/lib/interfaces/ticket.interfaces';
import CombinedLocationFilter from '../../Common/FilterComponents/CombinedLocationFilter';
import FilterWrapper from '../../Common/FilterComponents/FilterWrapper';
import DateFilter from './FilterComponents/DateFilter';

type FilterLabel = keyof TicketFilterInput;

interface GeneralFilterProps {
  filterData: TicketFilterInput;
  setFilterData: React.Dispatch<React.SetStateAction<TicketFilterInput>>;
  clearFilters: () => void;
}

const GeneralFilter = (props: GeneralFilterProps) => {
  const { filterData, setFilterData, clearFilters } = props;

  const handleFilterData = (
    option: Option | string,
    filterLabel: FilterLabel
  ) => {
    if (
      typeof option === 'string' ||
      typeof filterData[filterLabel] === 'string'
    ) {
      setFilterData({ ...filterData, [filterLabel]: option });
    } else {
      const newValue =
        filterData[filterLabel].find((item) => item.value === option.value) !==
        undefined
          ? filterData[filterLabel].filter(
              (item) => item.value !== option.value
            )
          : [...filterData[filterLabel], option];

      setFilterData({ ...filterData, [filterLabel]: newValue });
    }
  };

  return (
    <HStack spacing="7px" mt="42px">
      <FilterWrapper
        handleApplyFilter={() => {}}
        handleClearFilter={() => clearFilters()}
      >
        {/** * Validates the Combined From and To filters. * Ensures that the
        selected "To" date is not earlier than the "From" date, * and that the
        selected "From" date is not later than the "To" date. 
        */}

        <DateFilter
          label="From: "
          selectedDate={filterData.fromDate}
          handleClick={(date) => {
            handleFilterData(date, 'fromDate');
          }}
        />
        <DateFilter
          label="To: "
          selectedDate={filterData.toDate}
          handleClick={(date) => {
            handleFilterData(date, 'toDate');
          }}
        />
        <CombinedLocationFilter
          selectedRegion={filterData.region}
          selectedArea={filterData.area}
          selectedBranch={filterData.branch}
          handleSelectedOption={handleFilterData}
        />
      </FilterWrapper>
    </HStack>
  );
};

export default GeneralFilter;
