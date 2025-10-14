import { SimpleGrid, Skeleton, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { AssetBoxIcon } from '../../CustomIcons';
import SummaryCardWrapper from '../../Common/SummaryCardWrapper';
import { useGetLifeCycleStageSummaryQuery } from '~/lib/redux/services/asset/lifeCycle.services';
import AssetListModal from '../AssetCount/AssetListModal';

const SectionOne = () => {
  const { data, isLoading } = useGetLifeCycleStageSummaryQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SimpleGrid width="full" columns={{ base: 1, sm: 2, lg: 4 }} gap="16px">
      {isLoading &&
        Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton width="full" height="162px" key={index} rounded="8px" />
          ))}

      {!isLoading &&
        data?.data?.items?.map((item, index) => (
          <>
            <SummaryCardWrapper
              title={item?.lifeCycleStageDisplayName}
              icon={AssetBoxIcon}
              containerStyle={{ minH: '164px' }}
              //   additionalContent={}
              isLoading={false}
              count={item?.assetCount}
              key={index}
            >
              <Text
                color="blue.500"
                size="md"
                fontWeight={700}
                cursor="pointer"
                onClick={onOpen}
              >
                View Asset
              </Text>
            </SummaryCardWrapper>
            <AssetListModal
              name={item.lifeCycleStageDisplayName}
              isOpen={isOpen}
              onClose={onClose}
              columnId={item?.searchColumnValue!}
              columnName={item?.searchColumnName}
            />
          </>
        ))}
    </SimpleGrid>
  );
};

export default SectionOne;
