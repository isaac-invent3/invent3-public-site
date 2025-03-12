import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import AttachmentCard from './AttachmentCard';
import { useGetUserDocumentsQuery } from '~/lib/redux/services/user.services';
import { useAppSelector } from '~/lib/redux/hooks';
import { ButtonPagination } from '@repo/ui/components';

const Attachments = () => {
  const userDetail = useAppSelector((state) => state.user.user);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetUserDocumentsQuery(
    { userId: userDetail?.userId!, pageSize: 5, pageNumber: currentPage },
    { skip: !userDetail?.userId }
  );

  return (
    <VStack width="full" spacing="16px">
      <HStack width="full" spacing="24px" wrap="wrap">
        {isLoading &&
          Array(4)
            .fill('')
            .map((item, index) => (
              <Skeleton
                height="114px"
                width={{ base: 'full', sm: '182px' }}
                key={index}
              />
            ))}
        {!isLoading && (!data?.data || data?.data.items.length === 0) && (
          <Text color="neutral.600" mt={8} width="full" textAlign="center">
            No Attachment found
          </Text>
        )}
        {!isLoading &&
          data?.data &&
          data?.data.items.length > 0 &&
          data?.data.items.map((item, index) => (
            <AttachmentCard data={item} key={index} />
          ))}
      </HStack>
      {(data?.data?.hasPreviousPage || data?.data?.hasNextPage) && (
        <ButtonPagination
          totalPages={data?.data?.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </VStack>
  );
};

export default Attachments;
