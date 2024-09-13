import { Flex, Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import SelectInput from '~/lib/components/UI/Select';
import { categoryData } from '~/lib/utils/MockData/asset';
import AddButton from '../AddButton';
import { useGetAllAssetCategoryQuery } from '~/lib/redux/services/asset/category.services';
import { generateOptions } from '~/lib/utils/helperFunctions';

const AssetCategory = () => {
  const { data: assetCategoryData, isLoading } = useGetAllAssetCategoryQuery(
    {}
  );

  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Category"
          info="Choose the category and the sub-category"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap="11px" width="full">
        <GridItem colSpan={3}>
          <HStack spacing="11px" alignItems="flex-start">
            <VStack alignItems="flex-end" width="full">
              <SelectInput
                name="categoryId"
                title="Category"
                isLoading={isLoading}
                options={generateOptions(
                  assetCategoryData?.data?.items,
                  'categoryName',
                  'categoryId'
                )}
                isSearchable
              />
              <AddButton handleClick={() => {}}>Add New Category</AddButton>
            </VStack>
            <VStack alignItems="flex-end" width="full">
              <SelectInput
                name="subCategoryId"
                title="Sub Category"
                options={categoryData}
                width="full"
                isSearchable
              />
              <AddButton handleClick={() => {}}>Add New Subcategory</AddButton>
            </VStack>
          </HStack>
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default AssetCategory;
