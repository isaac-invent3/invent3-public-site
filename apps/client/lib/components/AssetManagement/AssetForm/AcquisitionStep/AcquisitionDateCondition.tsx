import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import SelectInput from '~/lib/components/UI/Select';
import { categoryData } from '~/lib/utils/MockData/asset';
import CustomDatePicker from './DatePicker';

const AcquisitionDateConditon = () => {
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
              options={categoryData}
              isSearchable
            />
          </HStack>
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default AcquisitionDateConditon;
