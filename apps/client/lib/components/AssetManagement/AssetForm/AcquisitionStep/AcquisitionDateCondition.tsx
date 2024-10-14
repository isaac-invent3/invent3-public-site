import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SectionInfo from '../../../UI/Form/FormSectionInfo';
import CustomDatePicker from '../../../UI/Form/FormDatePicker';
import {
  useGetAllAssetConditionQuery,
  useSearchConditionMutation,
} from '~/lib/redux/services/asset/condition.services';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import AssetStatusSelect from './AssetStatus';

const AcquisitionDateConditon = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAssetConditionQuery({
    pageSize: 25,
    pageNumber,
  });
  const [searchCondition] = useSearchConditionMutation({});
  const { conditionName } = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();
  return (
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <SectionInfo
          title="Acquisition Date"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap="20px" width="full">
        <GridItem colSpan={1}>
          <CustomDatePicker name="acquisitionDate" label="Acquisition Date" />
        </GridItem>
        <GridItem colSpan={1}>
          <HStack width="full" alignItems="flex-start" spacing="0px">
            <Flex width="full" maxW="130px">
              <SectionInfo
                title="Asset Condition"
                info="Add name that users can likely search with"
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
              <SectionInfo
                title="Asset Status"
                info="Add name that users can likely search with"
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
