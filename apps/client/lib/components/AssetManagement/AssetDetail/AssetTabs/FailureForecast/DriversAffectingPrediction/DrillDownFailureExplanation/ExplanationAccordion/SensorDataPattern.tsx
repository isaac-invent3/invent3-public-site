import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import React, { useEffect, useState } from 'react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAssetBmsReadingsBySubcategoryIdQuery,
  useGetBmsReadingSubCategoriesQuery,
} from '~/lib/redux/services/bms/bmsReading.services';
import { dateFormatter } from '~/lib/utils/Formatters';
import { generateOptions } from '~/lib/utils/helperFunctions';

const SensorDataPattern = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }

  const [tabIndex, setTabIndex] = useState(0);
  const { data: bmsReadingSubCategories } = useGetBmsReadingSubCategoriesQuery(
    {}
  );
  const [allTabs, setAllTabs] = useState<Option[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<Option | undefined>(undefined);
  const { data, isLoading } = useGetAssetBmsReadingsBySubcategoryIdQuery(
    {
      subcategoryId: selectedTab?.value as number,
      assetId: assetData?.assetId,
    },
    { skip: !selectedTab?.value || !assetData?.assetId }
  );

  const handleChange = (index: number) => {
    setTabIndex(index);
    setSelectedTab(allTabs?.[index]);
  };

  useEffect(() => {
    if (
      bmsReadingSubCategories?.data?.items &&
      bmsReadingSubCategories?.data?.items.length > 0
    ) {
      const options = generateOptions(
        bmsReadingSubCategories?.data?.items,
        'subCategoryName',
        'subCategoryId'
      );
      setAllTabs(options);
      setSelectedTab(options?.[0]);
    }
  }, [bmsReadingSubCategories]);

  return (
    <VStack width="full" spacing="26px" py={6}>
      <Tabs
        variant="enclosed"
        width={'full'}
        onChange={(index) => handleChange(index)}
        index={tabIndex}
        overflowX="auto"
      >
        <Flex width="full" px={{ base: '16px', md: 0 }}>
          <TabList width="full" borderBottomColor="#F2F1F1" overflowX="auto">
            {allTabs?.map((item, index) => (
              <Tab
                key={index}
                fontSize="10px"
                color="neutral.800"
                bgColor={index === tabIndex ? '#F2F1F1' : 'transparent'}
                borderTopRadius={index === tabIndex ? '8px' : 0}
              >
                {item?.label}
              </Tab>
            ))}
          </TabList>
        </Flex>
        <TabPanels pt="16px">
          {allTabs?.map((item, index) => (
            <TabPanel width="full" key={index}>
              <Flex width="full">
                <LineChart
                  labels={
                    data?.data && data?.data?.items?.length > 0
                      ? data?.data?.items?.map(
                          (item) =>
                            dateFormatter(item.day, 'MMM D') ?? undefined
                        )
                      : []
                  }
                  datasets={[
                    {
                      label: 'Sensor Data Pattern',
                      data:
                        data?.data && data?.data?.items?.length > 0
                          ? data?.data?.items?.map(
                              (item) => item.averageReadingValue
                            )
                          : [],
                      borderColor: '#8D35F1',
                      pointBorderColor: '#fff',
                      pointBackgroundColor: '#8D35F1',
                      pointRadius: 6,
                      borderWidth: 2,
                      tension: 0.4,
                      fill: false,
                    },
                  ]}
                  isLoading={isLoading}
                  showXGrid={false}
                  showYGrid={false}
                  xLabel="Date Range"
                  yLabel="Unit"
                />
              </Flex>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default SensorDataPattern;
