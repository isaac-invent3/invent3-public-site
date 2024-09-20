import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import React, { useState } from 'react';
import SectionInfo from '../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
import CustomDatePicker from './DatePicker';
import {
  useGetAllAssetDepreciationQuery,
  useSearchDepreciationMutation,
} from '~/lib/redux/services/asset/depreciation.services';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';

const DepreciationDetails = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAssetDepreciationQuery({
    pageSize: 25,
    pageNumber,
  });
  const [searchDepreciation] = useSearchDepreciationMutation({});

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

        <GenericAsyncSelect
          selectName="depreciationMethod"
          selectTitle="Depreciation Method"
          data={data}
          labelKey="depreciationMethod"
          valueKey="depreciationMethod"
          mutationFn={searchDepreciation}
          isLoading={isLoading}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
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
