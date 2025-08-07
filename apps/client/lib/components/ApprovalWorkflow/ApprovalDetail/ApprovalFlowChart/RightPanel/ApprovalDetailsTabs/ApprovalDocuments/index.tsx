import {
  Flex,
  HStack,
  Icon,
  Skeleton,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ButtonPagination } from '@repo/ui/components';
import { getDocumentInfo } from '~/lib/utils/helperFunctions';
import { FILE_ICONS } from '~/lib/utils/constants';
import { useState } from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetAllDocumentsByApprovalRequestIdQuery } from '~/lib/redux/services/approval-workflow/requestDocuments.services';
import { ApprovalWorkflowRequestDocument } from '~/lib/interfaces/approvalWorkflow.interfaces';
import ApprovalHeader from '../Header';

const ApprovalDocuments = () => {
  const approvalRequest = useAppSelector(
    (state) => state.approval.approvalRequest
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const { data, isLoading } = useGetAllDocumentsByApprovalRequestIdQuery(
    {
      id: approvalRequest?.approvalRequestId!,
      pageSize,
      pageNumber: currentPage,
    },
    { skip: !approvalRequest?.approvalRequestId }
  );

  const downloadDocument = (item: ApprovalWorkflowRequestDocument) => {
    if (item.document) {
      const link = document.createElement('a');
      link.href = `${item.base64Prefix}${item.document}`;
      link.download = item.documentName ?? '';
      link.click();
    }
  };

  return (
    <VStack
      width="full"
      alignItems="flex-start"
      divider={<StackDivider borderColor="neutral.600" />}
      spacing="16px"
    >
      <ApprovalHeader />
      {isLoading && (
        <VStack
          width="full"
          wrap="wrap"
          divider={<StackDivider borderColor="neutral.600" />}
          spacing="16px"
        >
          {Array(3)
            .fill('')
            .map((_, index) => (
              <Skeleton width="full" height="50px" key={index} />
            ))}
        </VStack>
      )}
      <Flex
        width="full"
        alignItems="flex-end"
        gap="16px"
        direction="column"
        my="16px"
      >
        <VStack
          width="full"
          alignItems="flex-start"
          divider={<StackDivider borderColor="neutral.600" />}
          spacing="16px"
        >
          {!isLoading &&
            data?.data &&
            data?.data?.items.length >= 1 &&
            data?.data?.items.map((item, index: number) => {
              const { extensionName } = getDocumentInfo({
                base64Document: item.document,
                documentName: item.documentName,
                base64Prefix: item.base64Prefix,
                documentId: item.documentId!,
              });
              return (
                <HStack
                  spacing="16px"
                  key={index}
                  width="full"
                  cursor="pointer"
                  onClick={() => downloadDocument(item)}
                >
                  <Icon
                    as={FILE_ICONS[extensionName ?? 'invalid']}
                    boxSize="24px"
                  />
                  <Text size="md" color="neutral.800" textAlign="center">
                    {item.documentName ?? '--'}
                  </Text>
                  <Text
                    bgColor="#F6F6F6"
                    color="neutral.800"
                    px="12px"
                    py="7px"
                    rounded="8px"
                  >
                    {extensionName}
                  </Text>
                </HStack>
              );
            })}
          {!isLoading && !data?.data && (
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
        </VStack>
        {(data?.data?.hasPreviousPage || data?.data?.hasNextPage) && (
          <ButtonPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={data?.data?.totalPages}
          />
        )}
      </Flex>
    </VStack>
  );
};

export default ApprovalDocuments;
