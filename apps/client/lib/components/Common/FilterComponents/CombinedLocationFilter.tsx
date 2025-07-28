/* eslint-disable no-unused-vars */
import { HStack, StackProps } from '@chakra-ui/react';

import RegionFilter from './RegionFilter';
import { Option } from '~/lib/interfaces/general.interfaces';
import LGAFilter from './LGAFilter';
import BranchFilter from './BranchFilter';
import { useSession } from 'next-auth/react';
import { ROLE_IDS_ENUM } from '~/lib/utils/constants';

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
  const session = useSession();
  return (
    (session?.data?.user?.roleIds.includes(ROLE_IDS_ENUM.CLIENT_ADMIN) ||
      session?.data?.user?.roleIds.includes(ROLE_IDS_ENUM.EXECUTIVE)) && (
      <HStack spacing="7px" flexWrap="wrap" {...rest}>
        <RegionFilter
          selectedOptions={selectedRegion}
          handleSelectedOption={(option) =>
            handleSelectedOption(option, 'region')
          }
        />
        <LGAFilter
          regions={selectedRegion}
          selectedOptions={selectedArea}
          handleSelectedOption={(option) =>
            handleSelectedOption(option, 'area')
          }
        />
        <BranchFilter
          areas={selectedArea}
          selectedOptions={selectedBranch}
          handleSelectedOption={(option) =>
            handleSelectedOption(option, 'branch')
          }
        />
      </HStack>
    )
  );
};

export default CombinedLocationFilter;
