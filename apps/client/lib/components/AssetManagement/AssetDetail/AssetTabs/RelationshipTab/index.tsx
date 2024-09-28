import { Text, Flex, VStack, Skeleton } from '@chakra-ui/react';
import React from 'react';
import { useGetAssetComponentInfoByAssetGuidQuery } from '~/lib/redux/services/asset/general.services';
import { useAppSelector } from '~/lib/redux/hooks';
import ComponentBox from './ComponentBox';
import AssetTable from '../../../Common/AssetTable';
import { Asset } from '~/lib/interfaces/asset.interfaces';

const EmptyState = ({ text }: { text: string }) => {
  return (
    <Text
      width="full"
      size="md"
      fontWeight={400}
      fontStyle="italic"
      my="41px"
      color="neutral.600"
      textAlign="center"
    >
      {text}
    </Text>
  );
};

const GenerateAssetTable = ({ asset }: { asset: Asset }) => {
  return (
    <AssetTable
      data={[asset] ?? []}
      isLoading={false}
      isFetching={false}
      showFooter={false}
      emptyLines={1}
      isSelectable={false}
      isSortable={false}
      showPopover={false}
    />
  );
};

const RelationshipTab = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  const { data, isLoading } = useGetAssetComponentInfoByAssetGuidQuery(
    { id: assetData.guid },
    { skip: !assetData.guid }
  );

  // Determine if any parent and child component exists
  const hasParent = data && data?.data?.parent !== null;
  const hasChildren =
    data &&
    data?.data?.childComponents &&
    data?.data?.childComponents.length > 0;

  if (isLoading) {
    return <Skeleton height="100px" mt="24px" />;
  }

  if (!isLoading && !hasParent && !hasChildren) {
    return <EmptyState text="This asset has no component" />;
  }

  return (
    <Flex direction="column" width="full" my="24px">
      {hasParent && (
        <ComponentBox
          isPrimary={false}
          assetName={data?.data?.parent?.assetName}
          nodeType="Parent"
          hasParent={false}
        >
          <GenerateAssetTable asset={data?.data?.parent} />
        </ComponentBox>
      )}
      <ComponentBox
        isPrimary
        hasParent={hasParent}
        assetName={data?.data?.asset?.assetName}
        nodeType="Asset"
      >
        <GenerateAssetTable asset={data?.data?.asset} />
      </ComponentBox>
      {hasChildren && (
        <VStack spacing={0} pl="56px">
          {data?.data?.childComponents.map((item: Asset, index: number) => (
            <ComponentBox
              isPrimary={false}
              hasParent
              assetName={item.assetName as string}
              nodeType="Child"
              key={index}
            >
              <GenerateAssetTable asset={item} />
            </ComponentBox>
          ))}
        </VStack>
      )}
    </Flex>
  );
};

export default RelationshipTab;
