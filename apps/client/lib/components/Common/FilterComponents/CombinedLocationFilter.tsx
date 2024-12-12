/* eslint-disable no-unused-vars */
import { HStack, StackProps } from '@chakra-ui/react';

import RegionFilter from './RegionFilter';
import { Option } from '~/lib/interfaces/general.interfaces';
import LGAFilter from './LGAFilter';
import BranchFilter from './BranchFilter';

interface CombinedLocationFilterProps extends StackProps {
  selectedRegion: Option[];
  selectedArea: Option[];
  selectedBranch: Option[];
  handleSelectedOption: (
    option: Option,
    key: 'region' | 'area' | 'branch'
  ) => void;
}

const CombinedLocationFilter = (props: CombinedLocationFilterProps) => {
  const {
    selectedArea,
    selectedBranch,
    selectedRegion,
    handleSelectedOption,
    ...rest
  } = props;
  return (
    <HStack spacing="7px" {...rest}>
      <RegionFilter
        selectedOptions={selectedRegion}
        handleSelectedOption={(option) =>
          handleSelectedOption(option, 'region')
        }
      />
      <LGAFilter
        regions={selectedRegion}
        selectedOptions={selectedArea}
        handleSelectedOption={(option) => handleSelectedOption(option, 'area')}
      />
      <BranchFilter
        areas={selectedArea}
        selectedOptions={selectedBranch}
        handleSelectedOption={(option) =>
          handleSelectedOption(option, 'branch')
        }
      />
    </HStack>
  );
};

export default CombinedLocationFilter;
