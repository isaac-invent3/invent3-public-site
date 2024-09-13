import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
import SelectInput from '~/lib/components/UI/Select';
import CustomDatePicker from './DatePicker';
import { useGetAllAssetDepreciationQuery } from '~/lib/redux/services/asset/depreciation.services';
import { generateOptions } from '~/lib/utils/helperFunctions';

const DepreciationDetails = () => {
  const { data: depreciationData, isLoading: depreciationLoading } =
    useGetAllAssetDepreciationQuery({ pageSize: 25 });

  return (
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <SectionInfo
          title="Depreciation Details"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <SimpleGrid columns={3} width="full" spacing="16px">
        <CustomDatePicker name="depreciationStartDate" label="Start Date" />
        <SelectInput
          name="depreciationMethod"
          title="Depreciation Method"
          options={generateOptions(
            depreciationData?.data?.items,
            'depreciationMethod',
            'depreciationId'
          )}
          isLoading={depreciationLoading}
          isSearchable
        />
        <Field
          as={TextInput}
          name="depreciationRate"
          type="number"
          label="Depreciation Rate"
          customStyles
        />
      </SimpleGrid>
    </HStack>
  );
};

export default DepreciationDetails;
