import { SimpleGrid, Skeleton, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AssetBoxIcon } from '../../CustomIcons';
import SummaryCardWrapper from '../../Common/SummaryCardWrapper';
import { useGetLifeCycleStageSummaryQuery } from '~/lib/redux/services/asset/lifeCycle.services';
import AssetListModal from '../AssetCount/AssetListModal';

const SectionOne = () => {
  const { data, isLoading } = useGetLifeCycleStageSummaryQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLifeCycleId, setSelectedLifeCycleID] = useState<
    string | number | undefined
  >(undefined);
  const [selectedLifeCycleName, setSelectedLifeCycleName] = useState<
    string | null
  >(null);

  return (
    <>
      <SimpleGrid width="full" columns={{ base: 1, sm: 2, lg: 3 }} gap="16px">
        {isLoading &&
          Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton width="full" height="162px" key={index} rounded="8px" />
            ))}

        {!isLoading &&
          data?.data?.map((item, index) => (
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
                  onClick={() => {
                    onOpen();
                    setSelectedLifeCycleID(item.lifeCycleId);
                    setSelectedLifeCycleName(item.lifeCycleStageDisplayName);
                  }}
                >
                  View Asset
                </Text>
              </SummaryCardWrapper>
            </>
          ))}
      </SimpleGrid>
      {isOpen && (
        <AssetListModal
          name={selectedLifeCycleName ?? ''}
          isOpen={isOpen}
          onClose={onClose}
          columnId={selectedLifeCycleId}
          columnName="lifeCycle"
        />
      )}
    </>
  );
};

export default SectionOne;
