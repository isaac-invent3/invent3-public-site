import { HStack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import DropDown from '~/lib/components/Dashboard/Common/DropDown';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAssetBmsReadingsBySubcategoryIdQuery,
  useGetBmsReadingSubCategoriesQuery,
} from '~/lib/redux/services/bms/bmsReading.services';
import { dateFormatter } from '~/lib/utils/Formatters';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface HistoryDataSnapShotProps {
  assetId?: number;
  isLoading: boolean;
}
const HistoryDataSnapShot = ({
  assetId,
  isLoading,
}: HistoryDataSnapShotProps) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<Option | null>(
    null
  );
  const {
    data: bmsReadingSubCategories,
    isLoading: bmsReadingSubCategoriesLoading,
  } = useGetBmsReadingSubCategoriesQuery({});
  const { data: assetBmsReading, isLoading: assetBmsReadingLoading } =
    useGetAssetBmsReadingsBySubcategoryIdQuery(
      {
        assetId: assetId!,
        subcategoryId: (selectedSubCategory?.value as number)!,
      },
      { skip: !selectedSubCategory }
    );
  return (
    <VStack spacing="16px" width="full" alignItems="flex-start">
      <HStack spacing="16px" width="full" justifyContent="space-between">
        <Text color="neutral.600" fontWeight={700}>
          Historical Data Snapshot
        </Text>
        <DropDown
          options={generateOptions(
            bmsReadingSubCategories?.data?.items,
            'subCategoryName',
            'subCategoryId'
          )}
          label="Sub Category"
          handleClick={(option) => setSelectedSubCategory(option)}
          selectedOptions={selectedSubCategory}
          width="100px"
        />
      </HStack>
      <LineChart
        labels={
          assetBmsReading?.data
            ? assetBmsReading?.data?.items?.map(
                (item) => dateFormatter(item.day, 'D')!
              )
            : []
        }
        datasets={[
          {
            label: '',
            data: assetBmsReading
              ? assetBmsReading?.data?.items?.map(
                  (item) => item.averageReadingValue
                )
              : [],
            borderColor: '#8D35F1',
            pointBorderColor: '#fff',
            pointBackgroundColor: '#8D35F1',
            pointRadius: 6,
            borderWidth: 3,
            tension: 0.4,
            fill: false,
          },
        ]}
        isLoading={
          isLoading || assetBmsReadingLoading || bmsReadingSubCategoriesLoading
        }
      />
    </VStack>
  );
};

export default HistoryDataSnapShot;
