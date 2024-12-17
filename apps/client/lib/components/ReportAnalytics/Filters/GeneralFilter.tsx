import { HStack } from '@chakra-ui/react';

import CombinedLocationFilter from '~/lib/components/Common/FilterComponents/CombinedLocationFilter';
import { Option } from '~/lib/interfaces/general.interfaces';
import { TicketFilterInput } from '~/lib/interfaces/ticket.interfaces';
import FilterWrapper from '../../Common/FilterComponents/FilterWrapper';
import DateRangeFilter from './DateRangeFilter';

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
      setFilterData((prevData) => ({ ...prevData, [filterLabel]: option }));
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
        <DateRangeFilter
          fromDate={filterData.fromDate}
          toDate={filterData.toDate}
          handleSelectedOption={handleFilterData}
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
