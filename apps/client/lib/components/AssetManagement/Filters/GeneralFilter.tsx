import { HStack } from '@chakra-ui/react';
import React from 'react';
import { FilterInput } from '~/lib/interfaces/asset.interfaces';
import Button from '../../UI/Button';
import CategoryFilter from './FilterComponents/CategoryFilter';
import StatusFilter from './FilterComponents/StatusFilter';
import RegionFilter from './FilterComponents/RegionFilter';

interface GeneralFilterProps {
  filterData: FilterInput;
  setFilterData: React.Dispatch<React.SetStateAction<FilterInput>>;
}

type FilterLabel = keyof FilterInput;

const GeneralFilter = (props: GeneralFilterProps) => {
  const { filterData, setFilterData } = props;

  const handleFilterData = (
    value: string | number,
    filterLabel: FilterLabel
  ) => {
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
  };

  return (
    <HStack spacing="7px">
      <CategoryFilter
        selectedOptions={filterData.category}
        handleSelectedOption={(value) => handleFilterData(value, 'category')}
      />
      <RegionFilter
        selectedOptions={filterData.region}
        handleSelectedOption={(value) => handleFilterData(value, 'region')}
      />
      <StatusFilter
        selectedOptions={filterData.status}
        handleSelectedOption={(value) => handleFilterData(value, 'status')}
      />
      <Button customStyles={{ width: '120px', height: '36px' }}>
        Apply Filter
      </Button>
      <Button
        variant="outline"
        customStyles={{ width: '120px', height: '36px' }}
        handleClick={() =>
          setFilterData({ category: [], region: [], status: [] })
        }
      >
        Reset Filter
      </Button>
    </HStack>
  );
};

export default GeneralFilter;
