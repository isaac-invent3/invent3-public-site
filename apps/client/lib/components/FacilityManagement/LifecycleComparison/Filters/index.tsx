import { HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React from 'react';
import CategoryFilter from '~/lib/components/AssetManagement/Filters/FilterComponents/CategoryFilter';
import DateRangeFilter from './DateRangeFilter';
import FacilityFilter from './FacilityFilter';
import MetricsFilter from './MetricsFilter';
import StatusFilter from './StatusFilter';

const Filters = () => {
  return (
    <VStack
      width="full"
      bgColor="white"
      padding="16px"
      rounded="8px"
      alignItems="flex-start"
      spacing="16px"
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
            handleSelectedOption={() => {}}
            selectedOptions={[]}
          />
          <FacilityFilter
            handleSelectedOption={() => {}}
            selectedOptions={[]}
          />
          <CategoryFilter
            label="Asset Category"
            handleSelectedOption={() => {}}
            selectedOptions={[]}
            hasBorder
          />
          <MetricsFilter handleSelectedOption={() => {}} selectedOptions={[]} />
          <StatusFilter handleSelectedOption={() => {}} selectedOptions={[]} />
        </HStack>
        <HStack spacing="16px">
          <Button customStyles={{ width: '110px', height: '36px' }}>
            Apply Filter
          </Button>
          <Text as="button" color="blue.500" whiteSpace="nowrap">
            Reset Filter
          </Text>
        </HStack>
      </Stack>
    </VStack>
  );
};

export default Filters;
