import { Flex, HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ButtonPagination } from '@repo/ui/components';
import { FILE_ICONS } from '~/lib/utils/constants';
import { getDocumentInfo } from '~/lib/utils/helperFunctions';
import { useGetAttachmentsByFeedBackIdQuery } from '~/lib/redux/services/feedback.services';
import { FeedbackAttachment } from '~/lib/interfaces/feedback.interfaces';

const FeedbackAttachments = ({ id }: { id: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const { data, isLoading } = useGetAttachmentsByFeedBackIdQuery(
    { id, pageSize, pageNumber: currentPage },
    { skip: !id }
  );

  const downloadDocument = (item: FeedbackAttachment) => {
    if (item.attachment) {
      const link = document.createElement('a');
      link.href = `${item.base64Prefix}${item.attachment}`;
      link.download = item.attachmentName;
      link.click();
    }
  };

  if (isLoading) {
    return (
      <HStack width="full" spacing="16px" wrap="wrap" my="16px">
        {Array(3)
          .fill('')
          .map((_, index) => (
            <Skeleton width="40px" height="40px" rounded="8px" key={index} />
          ))}
      </HStack>
    );
  }
  return (
    <Flex width="full" alignItems="flex-end" gap="16px" direction="column">
      <HStack width="full" spacing="24px" wrap="wrap" alignItems="flex-start">
        {data?.data && data?.data?.items.length >= 1 ? (
          data?.data?.items.map((item: FeedbackAttachment, index: number) => {
            const { extensionName } = getDocumentInfo({
              base64Document: item.attachment,
              documentName: item.attachmentName,
              base64Prefix: item.base64Prefix,
              documentId: item.attachmentId,
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
                  boxSize="34px"
                />
                <Text size="md" color="blue.500" textAlign="center">
                  {item.attachmentName}
                </Text>
              </VStack>
            );
          })
        ) : (
          <Text
            width="full"
            fontWeight={400}
            fontStyle="italic"
            my="0px"
            color="neutral.600"
            textAlign="center"
          >
            No Attachment
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

export default FeedbackAttachments;
