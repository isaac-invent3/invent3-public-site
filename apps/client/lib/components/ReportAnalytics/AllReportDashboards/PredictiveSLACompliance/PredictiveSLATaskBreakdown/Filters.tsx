import { HStack, Text } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import _ from 'lodash';
import React from 'react';
import DropDown from '~/lib/components/Dashboard/Common/DropDown';
import { useGetAllAssetCategoryQuery } from '~/lib/redux/services/asset/category.services';
import { DATE_PERIOD, DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface FiltersProps {
  slaStatus: Option | null;
  setSLAStatus: React.Dispatch<React.SetStateAction<Option | null>>;
  datePeriod: Option | null;
  setDatePeriod: React.Dispatch<React.SetStateAction<Option | null>>;
  category: Option | null;
  setCategory: React.Dispatch<React.SetStateAction<Option | null>>;
}
const Filters = (props: FiltersProps) => {
  const {
    slaStatus,
    setSLAStatus,
    datePeriod,
    setDatePeriod,
    category,
    setCategory,
  } = props;
  const { data, isLoading } = useGetAllAssetCategoryQuery({
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const handleClear = () => {
    setSLAStatus(null);
    setDatePeriod(null);
    setCategory(null);
  };

  return (
    <HStack spacing="8px" flexWrap="wrap">
      <DropDown
        options={[]}
        label="SLA Status"
        handleClick={(option) => {
          setSLAStatus(option);
        }}
        selectedOptions={slaStatus}
        width="125px"
        labelStyles={{ border: '1px solid #BBBBBB', bg: 'transparent' }}
      />
      <DropDown
        options={generateOptions(
          data?.data?.items,
          'categoryName',
          'categoryId'
        )}
        label="Asset Category"
        handleClick={(option) => {
          setCategory(option);
        }}
        selectedOptions={category}
        width="149px"
        isLoading={isLoading}
        labelStyles={{ border: '1px solid #BBBBBB', bg: 'transparent' }}
      />
      <DropDown
        options={Object.entries(DATE_PERIOD).map(([label, value]) => ({
          label: _.capitalize(`${label}ly`),
          value,
        }))}
        label="Date Period"
        handleClick={(option) => {
          setDatePeriod(option);
        }}
        selectedOptions={datePeriod}
        width="127px"
        labelStyles={{ border: '1px solid #BBBBBB', bg: 'transparent' }}
      />
      <Text
        cursor="pointer"
        fontWeight={700}
        color="blue.500"
        onClick={handleClear}
      >
        Clear
      </Text>
    </HStack>
  );
};

export default Filters;
