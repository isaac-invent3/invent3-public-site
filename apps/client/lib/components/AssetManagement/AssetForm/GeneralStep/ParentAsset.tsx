import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetallAssetQuery,
  useSearchAssetsMutation,
} from '~/lib/redux/services/asset/general.services';
import SectionInfo from '../../../UI/Form/FormSectionInfo';

interface ParentAssetProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const ParentAsset = (props: ParentAssetProps) => {
  const { handleSelect } = props;
  const [searchAsset] = useSearchAssetsMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetallAssetQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Parent Asset"
          info="Select a Parent you choose to link to"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap="11px" width="full">
        <GridItem colSpan={2}>
          <GenericAsyncSelect
            selectName="parentId"
            selectTitle="Parent Asset"
            data={data}
            labelKey="assetName"
            valueKey="assetId"
            mutationFn={searchAsset}
            isLoading={isLoading}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            handleSelect={handleSelect}
          />
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default ParentAsset;
