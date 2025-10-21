import { Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
import { FormInputWrapper, FormSectionInfo } from '@repo/ui/components';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useGetLifecyleStagesQuery,
  useSearchLifecyleStagesMutation,
} from '~/lib/redux/services/asset/lifeCycle.services';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const AssetLifecyleStageSelect = () => {
  const { statusName } = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();
  const [searchLifecycleStage] = useSearchLifecyleStagesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetLifecyleStagesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });

  return (
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      alignItems="flex-start"
      spacing={{ base: '16px', lg: '33px' }}
    >
      <FormInputWrapper
        sectionMaxWidth="144px"
        customSpacing="32px"
        title="Asset Stage"
        isRequired={false}
        description="Enter lifecycle stage of asset"
        direction={{ base: 'column', md: 'row' }}
        formSectionCustomStyle={{
          maxW: { base: '130px', lg: '144px' },
        }}
      >
        <Grid
          templateColumns={{ lg: 'repeat(3, 1fr)' }}
          gap="16px"
          width="full"
        >
          <GridItem colSpan={1}>
            <GenericAsyncSelect
              selectName="lifeCycleStageId"
              selectTitle="Asset Stage"
              data={data}
              labelKey="lifeCycleStageName"
              valueKey="lifeCycleId"
              mutationFn={searchLifecycleStage}
              isLoading={isLoading || isFetching}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              defaultInputValue={statusName}
              handleSelect={(option) =>
                dispatch(updateAssetForm({ lifeCycleStageName: option?.label }))
              }
              isSearchable={false}
            />
          </GridItem>
        </Grid>
      </FormInputWrapper>
    </Stack>
  );
};

export default AssetLifecyleStageSelect;
