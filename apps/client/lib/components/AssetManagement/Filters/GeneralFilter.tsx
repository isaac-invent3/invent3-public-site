import { HStack } from '@chakra-ui/react';
import React from 'react';
import { FilterInput } from '~/lib/interfaces/asset.interfaces';
import Button from '../../UI/Button';
import CategoryFilter from './FilterComponents/CategoryFilter';
import StatusFilter from './FilterComponents/StatusFilter';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  clearAssetFilter,
  updateAssetFilter,
} from '~/lib/redux/slices/AssetSlice';
import RegionFilter from '../../Common/FilterComponents/RegionFilter';
import LGAFilter from '../../Common/FilterComponents/LGAFilter';
import { Option } from '~/lib/interfaces/general.interfaces';
import BranchFilter from '../../Common/FilterComponents/BranchFilter';

interface GeneralFilterProps {
  handleApplyFilter: () => Promise<void>;
}

type FilterLabel = keyof FilterInput;

const GeneralFilter = (props: GeneralFilterProps) => {
  const { handleApplyFilter } = props;
  const filterData = useAppSelector((state) => state.asset.assetFilter);
  const dispatch = useAppDispatch();

  const handleFilterData = (option: Option, filterLabel: FilterLabel) => {
    const newValue =
      filterData[filterLabel].find((item) => item.value === option.value) !==
      undefined
        ? filterData[filterLabel].filter((item) => item.value !== option.value)
        : [...filterData[filterLabel], option];

    dispatch(updateAssetFilter({ [filterLabel]: newValue }));
  };

  return (
    <HStack spacing="7px" overflow="auto">
      <CategoryFilter
        selectedOptions={filterData.category}
        handleSelectedOption={(value) => handleFilterData(value, 'category')}
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
      <StatusFilter
        selectedOptions={filterData.status}
        handleSelectedOption={(value) => handleFilterData(value, 'status')}
      />
      <Button
        customStyles={{ minW: '120px', height: '36px' }}
        handleClick={() => handleApplyFilter()}
      >
        Apply Filter
      </Button>
      <Button
        variant="outline"
        customStyles={{ minW: '120px', height: '36px' }}
        handleClick={() => {
          dispatch(clearAssetFilter());
          handleApplyFilter();
        }}
      >
        Reset Filter
      </Button>
    </HStack>
  );
};

export default GeneralFilter;
