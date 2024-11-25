import { HStack } from '@chakra-ui/react';
import React from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { TicketFilterInput } from '~/lib/interfaces/ticket.interfaces';
import BranchFilter from '../../Common/FilterComponents/BranchFilter';
import LGAFilter from '../../Common/FilterComponents/LGAFilter';
import RegionFilter from '../../Common/FilterComponents/RegionFilter';
import Button from '../../UI/Button';
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

      <RegionFilter
        selectedOptions={filterData.region}
        handleSelectedOption={(value) => handleFilterData(value, 'region')}
      />
      <LGAFilter
        regions={filterData.region}
        selectedOptions={filterData.area}
        handleSelectedOption={(value) => handleFilterData(value, 'area')}
      />
      <BranchFilter
        areas={filterData.area}
        selectedOptions={filterData.branch}
        handleSelectedOption={(value) => handleFilterData(value, 'branch')}
      />

      <Button customStyles={{ width: '120px', height: '36px' }}>
        Apply Filter
      </Button>
      <Button
        variant="outline"
        customStyles={{ width: '120px', height: '36px' }}
        handleClick={() => clearFilters()}
      >
        Reset Filter
      </Button>
    </HStack>
  );
};

export default GeneralFilter;
