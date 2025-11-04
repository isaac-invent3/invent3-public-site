import { HStack, Icon, Stack, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React from 'react';
import CategoryFilter from '~/lib/components/AssetManagement/Filters/FilterComponents/CategoryFilter';
import { Option } from '~/lib/interfaces/general.interfaces';
import { LifeCycleFilter } from '~/lib/interfaces/location/lifecycle.interfaces';
import DateRangeFilter from '~/lib/components/Common/FilterComponents/DateRangeFilter';
import FacilityFilter from '~/lib/components/Common/FilterComponents/FacilityFilter';
import { DownloadIcon } from '~/lib/components/CustomIcons';

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
    <HStack width="full" justifyContent="space-between">
      <Stack
        width="max-content"
        alignItems="flex-start"
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: '16px', xl: '64px' }}
        bgColor="white"
        py={2}
        px={4}
        rounded="8px"
      >
        <HStack spacing="7px" flexWrap="wrap">
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
          <DateRangeFilter
            handleSelectedOption={(val: Option) =>
              onChange('datePeriod', [val], true)
            }
            selectedOptions={filters?.datePeriod.map((item) => ({
              label: item.toString(),
              value: item,
            }))}
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
      <Button
        customStyles={{
          minH: '36px',
          py: '6px',
          px: '8px',
          pr: '24px',
          width: '177px',
        }}
        handleClick={() => {}}
        loadingText="Exporting..."
        isLoading={false}
      >
        <Icon as={DownloadIcon} boxSize="18px" mr="8px" />
        Export
      </Button>
    </HStack>
  );
};

export default Filters;
