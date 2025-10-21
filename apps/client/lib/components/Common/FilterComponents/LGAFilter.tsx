import { HStack, Text, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { lgaApi } from '~/lib/redux/services/location/lga.services';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { CheckBox, FilterDropDown } from '@repo/ui/components';
import { useAppDispatch } from '~/lib/redux/hooks';

interface StateOption {
  stateId: number;
  stateName: string;
  lgaOptions: Option[];
}
interface LGAFilterProps {
  selectedOptions: Option[];
  // eslint-disable-next-line no-unused-vars
  handleSelectedOption: (option: Option) => void;
  regions: Option[];
}

const LGAFilter = (props: LGAFilterProps) => {
  const { selectedOptions, handleSelectedOption, regions } = props;
  const [stateOptions, setStateOptions] = useState<StateOption[]>([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const dispatch = useAppDispatch();

  // Checks if there are LGAs
  const noLGAs = _.every(
    stateOptions,
    (value) => _.isArray(value.lgaOptions) && _.isEmpty(value.lgaOptions)
  );

  useEffect(() => {
    const fetchLGAs = async () => {
      setLoadingStates(true);

      const newStateOptions: StateOption[] = [];
      const sortedRegion = _.orderBy(regions, ['label']);

      for (const state of sortedRegion) {
        const result = await dispatch(
          lgaApi.endpoints.getLGAByStateId.initiate({
            id: Number(state.value) ?? undefined,
            pageNumber: 1,
            pageSize: 50,
          })
        );

        if (result.data?.data?.items) {
          const lgaOptions = generateOptions(
            result.data.data.items,
            'lgaName',
            'lgaId'
          );

          newStateOptions.push({
            stateName: state.label,
            stateId: state.value as number,
            lgaOptions,
          });
        }
      }

      setLoadingStates(false);
      setStateOptions(newStateOptions);
    };
    fetchLGAs();
  }, [regions]);

  return (
    <FilterDropDown
      label="Location (Area):"
      options={[]}
      selectedOptions={selectedOptions}
      handleClick={(value) => handleSelectedOption(value)}
      hasMoreOptions={false}
      loadMoreOptions={undefined}
      isLoading={loadingStates}
    >
      <VStack width="full" spacing="16px" alignItems="flex-start">
        {!loadingStates &&
          (!noLGAs ? (
            stateOptions.map((item, index) => (
              <VStack width="full" spacing="8px" alignItems="flex-start">
                <Text
                  key={index}
                  fontWeight="bold"
                  color="neutral.800"
                  width="full"
                  pb="2px"
                  borderBottom="1px solid #BBBBBB"
                >
                  {item.stateName}
                </Text>
                {item.lgaOptions.length > 0 ? (
                  item.lgaOptions.map((item, idx) => (
                    <HStack spacing="8px" key={idx}>
                      <CheckBox
                        isChecked={
                          selectedOptions.find(
                            (option) => option?.value === item.value
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

export default LGAFilter;
