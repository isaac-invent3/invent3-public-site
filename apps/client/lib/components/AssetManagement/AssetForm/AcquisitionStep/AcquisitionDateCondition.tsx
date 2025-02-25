import { Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
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
import {
  FormDatePicker,
  FormInputWrapper,
  FormSectionInfo,
} from '@repo/ui/components';

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
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      alignItems="flex-start"
      spacing={{ base: '16px', lg: '33px' }}
    >
      <Flex width="full" maxW="144px" display={{ base: 'none', lg: 'flex' }}>
        <FormSectionInfo
          title="Acquisition Date"
          info="Acquisition Date"
          isRequired
        />
      </Flex>
      <Grid templateColumns={{ lg: 'repeat(3, 1fr)' }} gap="20px" width="full">
        <GridItem colSpan={1}>
          <FormInputWrapper
            sectionMaxWidth="130px"
            customSpacing="0px"
            description="Acquisition Date"
            title="Acquisition Date"
            isRequired
            direction={{ base: 'column', md: 'row' }}
            formSectionCustomStyle={{
              maxW: { md: '130px' },
              display: { lg: 'none' },
            }}
          >
            <FormDatePicker
              name="acquisitionDate"
              label="Select Date"
              maxDate={new Date()}
            />
          </FormInputWrapper>
        </GridItem>
        <GridItem colSpan={2}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing="20px">
            <FormInputWrapper
              sectionMaxWidth="130px"
              customSpacing="0px"
              description="Describe the current state of the asset"
              title="Asset Condition"
              isRequired
              direction={{ base: 'column', md: 'row' }}
              formSectionCustomStyle={{
                maxW: { md: '130px' },
                // display: { lg: 'none' },
              }}
            >
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
            </FormInputWrapper>
            <FormInputWrapper
              sectionMaxWidth="130px"
              customSpacing="0px"
              description="Select the asset's operational status"
              title="Asset Status"
              isRequired
              direction={{ base: 'column', md: 'row' }}
              formSectionCustomStyle={{
                maxW: { md: '130px' },
                // display: { lg: 'none' },
              }}
            >
              <AssetStatusSelect />
            </FormInputWrapper>
          </Stack>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default AcquisitionDateConditon;
