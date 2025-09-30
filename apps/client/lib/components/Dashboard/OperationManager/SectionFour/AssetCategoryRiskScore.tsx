import { Flex, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../Common/CardHeader';
import ChartLegend from '../../Common/Charts/ChartLegend';
import DoughtnutChart from '../../Common/Charts/DoughtnutChart';
import DropDown from '../../Common/DropDown';
import { useGetAllAssetCategoryQuery } from '~/lib/redux/services/asset/category.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

const AssetCategoryRiskScore = () => {
  const { data: allAssetCategories, isLoading } = useGetAllAssetCategoryQuery({
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const chartLegendItems = [
    {
      label: 'High Priority',
      color: '#0E2642',
      value: 50,
    },
    {
      label: 'Medium Priority',
      color: '#EABC30',
      value: 100,
    },
    {
      label: 'Low Priority',
      color: '#0366EF',
      value: 150,
    },
  ];

  return (
    <VStack
      width="full"
      height="full"
      minH="300px"
      p="16px"
      alignItems="flex-start"
      spacing="18px"
      bgColor="white"
      rounded="8px"
      maxH="375px"
    >
      <CardHeader>Asset Category Risk Score</CardHeader>
      <HStack
        width="full"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="flex-start"
      >
        <ChartLegend
          chartLegendItems={chartLegendItems}
          containerStyle={{
            direction: 'column',
            spacing: '6px',
          }}
          textStyle={{
            whiteSpace: 'nowrap',
          }}
        />
        <DropDown
          options={generateOptions(
            allAssetCategories?.data?.items,
            'categoryName',
            'categoryId'
          )}
          label="Category"
          handleClick={() => {}}
          selectedOptions={null}
          width="131px"
        />
      </HStack>
      <Flex width="full">
        <DoughtnutChart
          labels={chartLegendItems.map((item) => item.label)}
          datasets={[
            {
              data: chartLegendItems.map((item) => item.value ?? 0),
              backgroundColor: chartLegendItems.map((item) => item.color),
              borderWidth: 0,
            },
          ]}
          type="full"
          height="206px"
          cutout="50%"
        />
      </Flex>
    </VStack>
  );
};

export default AssetCategoryRiskScore;
