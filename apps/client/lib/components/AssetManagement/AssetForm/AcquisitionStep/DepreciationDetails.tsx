import { Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
import {
  FormDatePicker,
  FormInputWrapper,
  FormSectionInfo,
  FormTextInput,
} from '@repo/ui/components';

import { Field } from 'formik';
import { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllDepreciationMethodQuery,
  useSearchDepreciationMethodMutation,
} from '~/lib/redux/services/asset/depreciation.services';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const DepreciationDetails = () => {
  const { statusName } = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();
  const [searchDepreciationMethod] = useSearchDepreciationMethodMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllDepreciationMethodQuery({
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
      <Flex width="full" maxW="144px" display={{ base: 'none', lg: 'flex' }}>
        <FormSectionInfo
          title="Depreciation Details"
          info="Provide the asset's depreciation method"
          isRequired
        />
      </Flex>
      <Grid templateColumns={{ lg: 'repeat(3, 1fr)' }} gap="16px" width="full">
        <GridItem colSpan={1}>
          <FormInputWrapper
            sectionMaxWidth="130px"
            customSpacing="0px"
            description="Provide the asset's depreciation method"
            title="Depreciation Details"
            isRequired
            direction={{ base: 'column', md: 'row' }}
            formSectionCustomStyle={{
              maxW: { md: '130px' },
              display: { lg: 'none' },
            }}
          >
            <FormDatePicker name="depreciationStartDate" label="Select Date" />
          </FormInputWrapper>
        </GridItem>
        <GridItem colSpan={2} width="full">
          <Stack
            width="full"
            direction={{ base: 'column', md: 'row' }}
            alignItems="flex-start"
            spacing="16px"
          >
            <GenericAsyncSelect
              selectName="depreciationId"
              selectTitle="Depreciation Method"
              data={data}
              labelKey="methodName"
              valueKey="depreciationMethodId"
              mutationFn={searchDepreciationMethod}
              isLoading={isLoading || isFetching}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              defaultInputValue={statusName}
              handleSelect={(option) =>
                dispatch(updateAssetForm({ depreciationMethod: option.label }))
              }
              isSearchable={false}
            />
            <Field
              as={FormTextInput}
              name="depreciationRate"
              type="number"
              label="Depreciation Rate"
              placeholder="Depreciation Rate e.g 0.1"
              customStyles
            />
          </Stack>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default DepreciationDetails;
