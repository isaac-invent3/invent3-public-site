import { HStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import FilterDisplay from '~/lib/components/UI/Filter/FilterDisplay';
import FilterDropDown from '~/lib/components/UI/FilterDropDown';
import { FilterInput } from '~/lib/interfaces/asset.interfaces';
import { useGetAllAssetCategoryQuery } from '~/lib/redux/services/asset/category.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface ScheduleFilterDisplayProps {
  filterData: FilterInput;
  setFilterData: React.Dispatch<React.SetStateAction<FilterInput>>;
  isOpen: boolean;
}

type FilterLabel = keyof FilterInput;

const ScheduleFilterDisplay = (props: ScheduleFilterDisplayProps) => {
  const { filterData, setFilterData, isOpen } = props;
  const { data: assetCategoryData } = useGetAllAssetCategoryQuery({
    pageSize: DEFAULT_PAGE_SIZE,
  });

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
    <FilterDisplay isOpen={isOpen}>
      <HStack spacing="56px">
        <HStack spacing="7px">
          <FilterDropDown
            label="Maintenance Type"
            options={generateOptions(
              assetCategoryData?.data?.items,
              'categoryName',
              'categoryId'
            )}
            selectedOptions={filterData.category}
            handleClick={(value) => handleFilterData(value, 'category')}
          />
          <FilterDropDown
            label="Location"
            options={generateOptions(
              assetCategoryData?.data?.items,
              'categoryName',
              'categoryId'
            )}
            selectedOptions={filterData.location}
            handleClick={(value) => handleFilterData(value, 'location')}
          />
        </HStack>
        <Button
          variant="outline"
          customStyles={{ width: '120px', height: '36px' }}
        >
          Reset Filter
        </Button>
      </HStack>
    </FilterDisplay>
  );
};

export default ScheduleFilterDisplay;
