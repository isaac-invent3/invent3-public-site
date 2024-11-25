import { HStack } from '@chakra-ui/react';
import { filter } from 'lodash';
import React from 'react';
import { TicketFilterInput } from '~/lib/interfaces/ticket.interfaces';
import Button from '../../UI/Button';
import AreaFilter from './FilterComponents/AreaFilter';
import BranchFilter from './FilterComponents/BranchFilter';
import DateFilter from './FilterComponents/DateFilter';
import RegionFilter from './FilterComponents/RegionFilter';

type FilterLabel = keyof TicketFilterInput;

interface GeneralFilterProps {
  filterData: TicketFilterInput;
  setFilterData: React.Dispatch<React.SetStateAction<TicketFilterInput>>;
}

const GeneralFilter = (props: GeneralFilterProps) => {
  const { filterData, setFilterData } = props;

  const handleFilterData = (
    value: string | number,
    filterLabel: FilterLabel
  ) => {
    if (typeof filterData[filterLabel] == 'string') {
      setFilterData({ ...filter, [filterLabel]: value });
    } else {
      setFilterData((prev) => {
        const updatedValues = [...prev[filterLabel]];

        if (updatedValues.includes(value)) {
          // Remove the value if it already exists
          return {
            ...prev,
            [filterLabel]: updatedValues.filter((item) => item !== value),
          };
        } else {
          // Add the value if it does not exist
          return {
            ...prev,
            [filterLabel]: [...updatedValues, value],
          };
        }
      });
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
      <AreaFilter
        selectedOptions={filterData.lga}
        handleSelectedOption={(value) => handleFilterData(value, 'lga')}
      />
      <BranchFilter
        selectedOptions={filterData.branch}
        handleSelectedOption={(value) => handleFilterData(value, 'branch')}
      />

      <Button customStyles={{ width: '120px', height: '36px' }}>
        Apply Filter
      </Button>
      <Button
        variant="outline"
        customStyles={{ width: '120px', height: '36px' }}
        handleClick={() =>
          setFilterData({
            region: [],
            lga: [],
            branch: [],
            fromDate: undefined,
            toDate: undefined,
          })
        }
      >
        Reset Filter
      </Button>
    </HStack>
  );
};

export default GeneralFilter;
