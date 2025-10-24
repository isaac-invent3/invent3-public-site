import { Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import CardHeader from '../../Common/CardHeader';
import ChartLegend from '../../Common/Charts/ChartLegend';
import DoughtnutChart from '../../Common/Charts/DoughtnutChart';
import DropDown from '../../Common/DropDown';
import { useGetAllAssetCategoryQuery } from '~/lib/redux/services/asset/category.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import {
  formatNumberShort,
  generateOptions,
} from '~/lib/utils/helperFunctions';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useGetAssetRiskScoresForCategoryQuery } from '~/lib/redux/services/asset/general.services';

const AssetCategoryRiskScore = () => {
  const { data: allAssetCategories, isLoading } = useGetAllAssetCategoryQuery({
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const { data, isLoading: isLoadingRiskscore } =
    useGetAssetRiskScoresForCategoryQuery(
      { categoryId: (selectedOption?.value as number)! },
      { skip: !selectedOption?.value }
    );

  const chartLegendItems = [
    {
      label: 'High Risk',
      color: '#0E2642',
      value: data?.data?.highRiskAssets ?? 0,
    },
    {
      label: 'Medium Risk',
      color: '#EABC30',
      value: data?.data?.mediumRiskAssets ?? 0,
    },
    {
      label: 'Low Risk',
      color: '#0366EF',
      value: data?.data?.lowRiskAssets ?? 0,
    },
  ];
  const totalAsset =
    (data?.data?.highRiskAssets ?? 0) +
    (data?.data?.mediumRiskAssets ?? 0) +
    (data?.data?.lowRiskAssets ?? 0);

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
          handleClick={(option) => {
            setSelectedOption(option);
          }}
          selectedOptions={selectedOption}
          width="131px"
          isLoading={isLoading}
        />
      </HStack>
      <Flex width="full" justifyContent="center">
        {isLoadingRiskscore && (
          <Skeleton width="206px" height="206px" rounded="full" />
        )}
        {!isLoadingRiskscore && (
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
            centerLabel={{
              title: 'Total Assets',
              value: formatNumberShort(totalAsset),
            }}
            showSliceLabels={true}
            tooltipFormatter={(value, total, label) => {
              const percent = ((value / total) * 100).toFixed(0);
              return [
                `Risk Percentage: ${percent}%`,
                `Risk Score: ${value.toLocaleString()}`,
              ];
            }}
          />
        )}
      </Flex>
    </VStack>
  );
};

export default AssetCategoryRiskScore;
