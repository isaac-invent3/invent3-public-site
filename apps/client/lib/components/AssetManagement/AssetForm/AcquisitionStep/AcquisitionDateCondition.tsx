import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import SelectInput from '~/lib/components/UI/Select';
import CustomDatePicker from './DatePicker';
import { useGetAllAssetConditionQuery } from '~/lib/redux/services/asset/condition.services';
import { generateOptions } from '~/lib/utils/helperFunctions';

const AcquisitionDateConditon = () => {
  const { data: conditionData, isLoading: conditionLoading } =
    useGetAllAssetConditionQuery({ pageSize: 25 });
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
        <GridItem colSpan={2}>
          <HStack width="full" alignItems="flex-start" spacing="39px">
            <Flex width="full" maxW="151px">
              <SectionInfo
                title="Acquisition Condition"
                info="Add name that users can likely search with"
                isRequired
              />
            </Flex>
            <SelectInput
              name="conditionId"
              title="Select an option"
              options={generateOptions(
                conditionData?.data?.items,
                'conditionName',
                'conditionId'
              )}
              isLoading={conditionLoading}
              isSearchable
            />
          </HStack>
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default AcquisitionDateConditon;
