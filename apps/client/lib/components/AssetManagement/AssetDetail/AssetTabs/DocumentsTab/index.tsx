import { Flex, HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { ButtonPagination } from '@repo/ui/components';
import { AssetDocument } from '~/lib/interfaces/asset/general.interface';
import { FILE_ICONS } from '~/lib/utils/constants';
import { getDocumentInfo } from '~/lib/utils/helperFunctions';
import { useGetAssetDocumentsByAssetIdQuery } from '~/lib/redux/services/asset/document.services';

const DocumentsTab = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }

  const { assetId } = assetData;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const { data, isLoading } = useGetAssetDocumentsByAssetIdQuery(
    { id: assetId, pageSize, pageNumber: currentPage },
    { skip: !assetId }
  );

  const downloadDocument = (item: AssetDocument) => {
    if (item.document) {
      const link = document.createElement('a');
      link.href = `${item.base64Prefix}${item.document}`;
      link.download = item.documentName;
      link.click();
    }
  };

  if (isLoading) {
    return (
      <HStack width="full" spacing="24px" wrap="wrap" my="16px">
        {Array(3)
          .fill('')
          .map((_, index) => (
            <Skeleton width="58px" height="58px" rounded="8px" key={index} />
          ))}
      </HStack>
    );
  }
  return (
    <Flex
      width="full"
      alignItems="flex-end"
      gap="16px"
      direction="column"
      my="16px"
    >
      <HStack width="full" spacing="24px" wrap="wrap" alignItems="flex-start">
        {data?.data && data?.data?.items.length >= 1 ? (
          data?.data?.items.map((item: AssetDocument, index: number) => {
            const { extensionName } = getDocumentInfo({
              base64Document: item.document,
              documentName: item.documentName,
              base64Prefix: item.base64Prefix,
              documentId: item.documentId,
            });
            return (
              <VStack
                spacing="11px"
                px="5px"
                key={index}
                cursor="pointer"
                onClick={() => downloadDocument(item)}
              >
                <Icon
                  as={FILE_ICONS[extensionName ?? 'invalid']}
                  boxSize="58px"
                />
                <Text
                  size="md"
                  color="neutral.600"
                  textAlign="center"
                  width="100px"
                  textOverflow="ellipsis"
                >
                  {item.documentName}
                </Text>
              </VStack>
            );
          })
        ) : (
          <Text
            width="full"
            size="md"
            fontWeight={400}
            fontStyle="italic"
            my="41px"
            color="neutral.600"
            textAlign="center"
          >
            No Document at the moment.
          </Text>
        )}
      </HStack>
      {(data?.data?.hasPreviousPage || data?.data?.hasNextPage) && (
        <ButtonPagination
          totalPages={data?.data?.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Flex>
  );
};

export default DocumentsTab;
