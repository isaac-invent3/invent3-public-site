import { Flex, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
// import Button from '~/lib/components/UI/Button';
import { useAppSelector } from '~/lib/redux/hooks';
import Button from '~/lib/components/UI/Button';
import { ContractDocument } from '~/lib/interfaces/asset.interfaces';
import { useGetDocumentsByAssetIdQuery } from '~/lib/redux/services/asset/general.services';
import Image from 'next/image';

const DocumentsTab = () => {
  const { assetId } = useAppSelector((state) => state.asset.asset);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(25);
  const { data, isLoading } = useGetDocumentsByAssetIdQuery(
    { id: assetId, pageSize, pageNumber: currentPage },
    { skip: !assetId }
  );
  const mimeType = 'application/pdf';
  const downloadDocument = (item: ContractDocument) => {
    if (item.contractDocument) {
      const link = document.createElement('a');
      link.href = `data:${mimeType};base64,${item.contractDocument}`;
      link.download = `${item.documentName}.pdf`;
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
      <HStack width="full" spacing="24px" wrap="wrap">
        {data?.data?.items.length >= 1 ? (
          data?.data?.items.map((item: ContractDocument, index: number) => (
            <VStack
              spacing="11px"
              px="5px"
              key={index}
              width="67px"
              cursor="pointer"
              onClick={() => downloadDocument(item)}
            >
              <Flex position="relative" width="58px" height="58px">
                <Image src="/pdf.png" fill alt="Pdf image" />
              </Flex>
              <Text size="md" color="neutral.600" textAlign="center">
                {item.documentName}
              </Text>
            </VStack>
          ))
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
