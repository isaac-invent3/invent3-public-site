import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  useGetAllAssetConditionQuery,
  useSearchConditionMutation,
} from '~/lib/redux/services/asset/condition.services';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import AssetStatusSelect from './AssetStatus';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { FormDatePicker, FormSectionInfo } from '@repo/ui/components';

const AcquisitionDateConditon = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAssetConditionQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  const [searchCondition] = useSearchConditionMutation({});
  const { conditionName } = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();
  return (
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <FormSectionInfo
          title="Acquisition Date"
          info="Enter the date the asset was acquired"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap="20px" width="full">
        <GridItem colSpan={1}>
          <FormDatePicker
            name="acquisitionDate"
            label="Select Date"
            maxDate={new Date()}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <HStack width="full" alignItems="flex-start" spacing="0px">
            <Flex width="full" maxW="130px">
              <FormSectionInfo
                title="Asset Condition"
                info="Describe the current state of the asset"
                isRequired
              />
            </Flex>
            <GenericAsyncSelect
              selectName="conditionId"
              selectTitle="Condition"
              data={data}
              labelKey="conditionName"
              valueKey="conditionId"
              defaultInputValue={conditionName}
              mutationFn={searchCondition}
              isLoading={isLoading}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              handleSelect={(option) =>
                dispatch(updateAssetForm({ conditionName: option.label }))
              }
            />
          </HStack>
        </GridItem>
        <GridItem colSpan={1}>
          <HStack width="full" alignItems="flex-start" spacing="0px">
            <Flex width="full" maxW="130px">
              <FormSectionInfo
                title="Asset Status"
                info="Select the asset's operational status"
                isRequired
              />
            </Flex>
            <AssetStatusSelect />
          </HStack>
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default AcquisitionDateConditon;
