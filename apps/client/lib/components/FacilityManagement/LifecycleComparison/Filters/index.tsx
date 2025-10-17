import { HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React from 'react';
import CategoryFilter from '~/lib/components/AssetManagement/Filters/FilterComponents/CategoryFilter';
import DateRangeFilter from './DateRangeFilter';
import FacilityFilter from './FacilityFilter';
import MetricsFilter from './MetricsFilter';
import { Option } from '~/lib/interfaces/general.interfaces';
import { LifeCycleFilter } from '~/lib/interfaces/location/lifecycle.interfaces';
import StatusFilter from '~/lib/components/AssetManagement/Filters/FilterComponents/StatusFilter';

interface FiltersProps {
  filters: LifeCycleFilter;
  onChange: (
    key: keyof LifeCycleFilter,
    value: Option[],
    singleSelect?: boolean
  ) => void;
  onApply: () => void;
  onReset: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  onChange,
  onApply,
  onReset,
}) => {
  return (
    <VStack
      width="full"
      bgColor="white"
      padding="16px"
      rounded="8px"
      alignItems="flex-start"
      spacing="16px"
      className="no-pdf"
    >
      <Text size="md" color="neutral.800">
        Filters
      </Text>
      <Stack
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        direction={{ base: 'column', lg: 'row' }}
        spacing="16px"
      >
        <HStack spacing="7px" flexWrap="wrap">
          <DateRangeFilter
            handleSelectedOption={(val: Option) =>
              onChange('datePeriod', [val], true)
            }
            selectedOptions={filters?.datePeriod.map((item) => ({
              label: item.toString(),
              value: item,
            }))}
          />
          <FacilityFilter
            handleSelectedOption={(val: Option) =>
              onChange('facilities', [val])
            }
            selectedOptions={filters?.facilities.map((item) => ({
              label: item.toString(),
              value: item,
            }))}
          />
          <CategoryFilter
            label="Asset Category"
            handleSelectedOption={(val: Option) =>
              onChange('assetCategories', [val])
            }
            selectedOptions={filters?.assetCategories.map((item) => ({
              label: item.toString(),
              value: item,
            }))}
            hasBorder
          />
          <MetricsFilter
            handleSelectedOption={(val: Option) =>
              onChange('metricsToCompare', [val])
            }
            selectedOptions={filters?.metricsToCompare.map((item) => ({
              label: item.toString(),
              value: item,
            }))}
          />
          <StatusFilter
            handleSelectedOption={(val: Option) =>
              onChange('assetStatus', [val])
            }
            selectedOptions={filters?.assetStatus.map((item) => ({
              label: item.toString(),
              value: item,
            }))}
            containerStyles={{ border: '1px solid #BBBBBB', rounded: '6px' }}
          />
        </HStack>

        <HStack spacing="16px">
          <Button
            customStyles={{ width: '110px', height: '36px' }}
            handleClick={onApply}
          >
            Apply Filter
          </Button>
          <Text
            as="button"
            color="blue.500"
            whiteSpace="nowrap"
            onClick={onReset}
          >
            Reset Filter
          </Text>
        </HStack>
      </Stack>
    </VStack>
  );
};

export default Filters;
