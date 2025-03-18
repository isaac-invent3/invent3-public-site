'use client';

import {
  Flex,
  Grid,
  Skeleton,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { Select } from '@repo/ui/components';
import { useEffect, useState } from 'react';
import { ValidColumnNames } from '~/lib/interfaces/asset/general.interface';
import { useGetAssetCountByColumnNameQuery } from '~/lib/redux/services/asset/general.services';
import PageHeader from '../../UI/PageHeader';
import AssetCountCard from './AssetCountCard';

interface DropdownData {
  label: string;
  value: ValidColumnNames;
}

const dropdownData: DropdownData[] = [
  {
    label: 'Asset Type',
    value: 'AssetType',
  },
  {
    label: 'Category',
    value: 'Category',
  },
  {
    label: 'Condition',
    value: 'Condition',
  },
  {
    label: 'Status',
    value: 'Status',
  },
];
0;
const AssetCount = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');

  const [selectedClass, setSelectedClass] = useState<DropdownData | undefined>(
    dropdownData[0]
  );

  const { refetch, isLoading, isFetching, data } =
    useGetAssetCountByColumnNameQuery(selectedClass?.value ?? 'AssetType', {
      skip: !selectedClass,
    });

  useEffect(() => {
    selectedClass?.value && refetch();
  }, [selectedClass]);

  return (
    <Flex
      width="full"
      direction="column"
      pb="24px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>Asset Counts</PageHeader>

      <Stack
        width="full"
        spacing="16px"
        alignItems="center"
        direction={{ base: 'column', sm: 'row' }}
        mt={10}
      >
        <Text>Show Assets Count by: </Text>

        <Select
          title="Type"
          options={dropdownData}
          selectedOption={selectedClass}
          containerStyles={{
            width: isMobile ? '100%' : '261px',
          }}
          selectStyles={{ height: '46px', pt: '0px' }}
          showTitleAfterSelect={false}
          handleSelect={(option) => {
            setSelectedClass(option as DropdownData);
          }}
        />
      </Stack>

      <Grid
        templateColumns="repeat(auto-fit, minmax(230px, 1fr))"
        gap="24px"
        my="2em"
      >
        {(isLoading || isFetching) &&
          Array.from({ length: 15 }).map((_, index) => (
            <Skeleton
              bg="gray.100"
              borderRadius="16px"
              height="224px"
              boxShadow="md"
              textAlign="center"
              bgColor="#EBEBEB"
              overflow="hidden"
            />
          ))}

        {!(isLoading || isFetching) &&
          data?.data.map((item, index) => (
            <AssetCountCard data={item} key={index} />
          ))}
      </Grid>
    </Flex>
  );
};

export default AssetCount;
