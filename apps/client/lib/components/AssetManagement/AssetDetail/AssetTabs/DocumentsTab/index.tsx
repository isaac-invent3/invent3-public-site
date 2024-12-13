import { Flex, HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { Button } from '@repo/ui/components';
import { AssetDocument } from '~/lib/interfaces/asset.interfaces';
import { FILE_ICONS } from '~/lib/utils/constants';
import { getDocumentInfo } from '~/lib/utils/helperFunctions';
import { useGetAssetDocumentsByAssetIdQuery } from '~/lib/redux/services/asset/document.services';

const DocumentsTab = () => {
  const { assetId } = useAppSelector((state) => state.asset.asset);
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
                width="100px"
                cursor="pointer"
                onClick={() => downloadDocument(item)}
              >
                <Icon
                  as={FILE_ICONS[extensionName ?? 'invalid']}
                  boxSize="58px"
                />
                <Text size="md" color="neutral.600" textAlign="center">
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
        <Flex justifyContent="space-between" width="full" mt={4}>
          <Button
            variant="secondary"
            handleClick={() => setCurrentPage((prev) => prev - 1)}
            isDisabled={currentPage === 1}
            customStyles={{ width: '100px' }}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            handleClick={() => setCurrentPage((prev) => prev + 1)}
            isDisabled={
              data?.data?.totalPages === 0 ||
              currentPage === data?.data?.totalPages
            }
            customStyles={{ width: '100px' }}
          >
            Next
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default DocumentsTab;
