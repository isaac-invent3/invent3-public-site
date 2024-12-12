import { HStack, Text, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import FilterDropDown from '~/lib/components/UI/FilterDropDown';
import { Option } from '~/lib/interfaces/general.interfaces';
import { locationApi } from '~/lib/redux/services/asset/location.services';
import { generateOptions } from '~/lib/utils/helperFunctions';
import CheckBox from '../../UI/CheckBox';
import { useAppDispatch } from '~/lib/redux/hooks';

interface BranchOption {
  lgaId: number;
  lgaName: string;
  facilityOptions: Option[];
}
interface BranchFilterProps {
  selectedOptions: Option[];
  // eslint-disable-next-line no-unused-vars
  handleSelectedOption: (option: Option) => void;
  areas: Option[];
}

const BranchFilter = (props: BranchFilterProps) => {
  const { selectedOptions, handleSelectedOption, areas } = props;
  const [branchOptions, setBranchOptions] = useState<BranchOption[]>([]);
  const [loadingBranch, setLoadingBranch] = useState(true);
  const dispatch = useAppDispatch();

  // Checks if all filterdata is empty
  const noLGAs = _.every(
    branchOptions,
    (value) =>
      _.isArray(value.facilityOptions) && _.isEmpty(value.facilityOptions)
  );

  useEffect(() => {
    const fetchFacility = async () => {
      setLoadingBranch(true);

      const newbranchOptions: BranchOption[] = [];

      const sortedAreas = _.orderBy(areas, ['label']);

      for (const area of sortedAreas) {
        const result = await dispatch(
          locationApi.endpoints.getFacilitiesByLGAId.initiate({
            id: area.value,
            pageNumber: 1,
            pageSize: 50,
          })
        );

        if (result.data?.data?.items) {
          const facilityOptions = generateOptions(
            result.data.data.items,
            'facilityName',
            'facilityId'
          );

          newbranchOptions.push({
            lgaName: area.label,
            lgaId: area.value as number,
            facilityOptions,
          });
        }
      }

      setLoadingBranch(false);
      setBranchOptions(newbranchOptions);
    };
    fetchFacility();
  }, [areas]);

  return (
    <FilterDropDown
      label="Location (Branch):"
      options={[]}
      selectedOptions={selectedOptions}
      handleClick={(value) => handleSelectedOption(value)}
      hasMoreOptions={false}
      loadMoreOptions={undefined}
      isLoading={loadingBranch}
    >
      <VStack width="full" spacing="16px" alignItems="flex-start">
        {!loadingBranch &&
          (!noLGAs ? (
            branchOptions.map((item, index) => (
              <VStack width="full" spacing="8px" alignItems="flex-start">
                <Text
                  key={index}
                  fontWeight="bold"
                  color="neutral.800"
                  width="full"
                  pb="2px"
                  borderBottom="1px solid #BBBBBB"
                >
                  {item.lgaName}
                </Text>
                {item.facilityOptions.length > 0 ? (
                  item.facilityOptions.map((item, idx) => (
                    <HStack spacing="8px" key={idx}>
                      <CheckBox
                        isChecked={
                          selectedOptions.find(
                            (option) => option.value === item.value
                          ) !== undefined
                        }
                        handleChange={() => handleSelectedOption(item)}
                      />
                      <Text color="neutral.800">{item.label}</Text>
                    </HStack>
                  ))
                ) : (
                  <Text
                    my={2}
                    width="full"
                    textAlign="center"
                    color="neutral.300"
                  >
                    No Options
                  </Text>
                )}
              </VStack>
            ))
          ) : (
            <Text my={4} width="full" textAlign="center" color="neutral.300">
              No Options
            </Text>
          ))}
      </VStack>
    </FilterDropDown>
  );
};

export default BranchFilter;
