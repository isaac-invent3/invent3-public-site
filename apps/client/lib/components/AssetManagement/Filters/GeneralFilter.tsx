import { HStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FilterInput } from '~/lib/interfaces/asset.interfaces';
import FilterDropDown from '../../UI/FilterDropDown';
import { categoryData } from '~/lib/utils/MockData/asset';
import Button from '../../UI/Button';
import { useGetAllAssetCategoryQuery } from '~/lib/redux/services/asset/category.services';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface GeneralFilterProps {
  filterData: FilterInput;
  setFilterData: React.Dispatch<React.SetStateAction<FilterInput>>;
}

type FilterLabel = keyof FilterInput;

const GeneralFilter = (props: GeneralFilterProps) => {
  const { filterData, setFilterData } = props;
  const { data: assetCategoryData } = useGetAllAssetCategoryQuery({
    pageSize: 25,
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

  useEffect(() => {
    console.log(
      generateOptions(assetCategoryData?.data?.items, 'categoryName', 'id')
    );
    console.log(filterData);
  }, [filterData]);

  return (
    <HStack spacing="56px">
      <HStack spacing="7px">
        <FilterDropDown
          label="Category"
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
          options={categoryData}
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
  );
};

export default GeneralFilter;
