import {
  Avatar,
  Heading,
  HStack,
  Icon,
  ModalBody,
  ModalHeader,
  Text,
  VStack,
} from '@chakra-ui/react';
import { OPERATORS } from '@repo/constants';
import { GenericModal, LoadingSpinner, SearchInput } from '@repo/ui/components';
import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CloseIcon } from '~/lib/components/CustomIcons';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { User } from '~/lib/interfaces/user.interfaces';
import {
  useGetAllUsersQuery,
  useSearchUsersMutation,
} from '~/lib/redux/services/user.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface UserSelectSecondaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'select' | 'edit';
  externalSearch?: string;
  setExternalSearch?: React.Dispatch<React.SetStateAction<string>>;
  externalUsers?: User[];
  // eslint-disable-next-line no-unused-vars
  handleSelectUser?: (user: User) => void;
  hasMore?: boolean;
  externalLoading?: boolean;
  externalSearchLoading?: boolean;
}
const UserSelectSecondaryModal = (props: UserSelectSecondaryModalProps) => {
  const {
    isOpen,
    onClose,
    type,
    setExternalSearch,
    externalUsers,
    handleSelectUser,
    hasMore,
    externalLoading,
    externalSearchLoading,
  } = props;
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [searchUsers, { isLoading: searchLoading }] = useSearchUsersMutation(
    {}
  );
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllUsersQuery({
    pageSize: pageSize,
    pageNumber,
  });
  const { handleSubmit } = useCustomMutation();

  const searchCriterion = {
    ...(search && {
      orCriterion: [
        ...(search
          ? [
              [
                {
                  columnName: 'firstName',
                  columnValue: search,
                  operation: OPERATORS.Contains,
                },
              ],
            ]
          : []),
        ...(search
          ? [
              [
                {
                  columnName: 'lastName',
                  columnValue: search,
                  operation: OPERATORS.Contains,
                },
              ],
            ]
          : []),
      ],
    }),
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchUsers, searchCriterion, '');
    if (response?.data?.data) setUsers(response?.data?.data.items);
  }, [searchUsers, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
      if (data) {
        setUsers(data?.data?.items);
      }
    }
  }, [search]);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: '445px',
        height: '575px',
        p: { base: '16px', lg: '24px' },
      }}
    >
      <ModalHeader p={0} m={0}>
        <VStack spacing="24px" width="full">
          <HStack width="full" justifyContent="space-between">
            <Heading size={{ lg: 'md' }}>
              {type === 'select' ? 'Select User' : 'Edit User'}
            </Heading>
            <HStack
              spacing="8px"
              as="button"
              onClick={onClose}
              alignItems="center"
            >
              <Text color="#F50000">Close</Text>
              <Icon as={CloseIcon} color="#F50000" boxSize="12px" />
            </HStack>
          </HStack>
          <SearchInput
            setSearch={setExternalSearch ?? setSearch}
            customStyle={{ width: 'full', bgColor: 'neutral.100' }}
            containerStyle={{ width: 'full' }}
          />
        </VStack>
      </ModalHeader>
      <ModalBody p={0} m={0} mt="24px" id="allUsersDiv">
        <InfiniteScroll
          dataLength={users.length}
          next={() => {
            setPageNumber((prev) => prev + 1);
          }}
          hasMore={
            hasMore ?? (data?.data ? data.data?.totalPages > pageNumber : false)
          }
          scrollableTarget="allUsersDiv"
          loader={<LoadingSpinner />}
        >
          {(isLoading || externalLoading) && <LoadingSpinner />}
          {!isLoading &&
            !searchLoading &&
            !externalLoading &&
            (externalUsers
              ? externalUsers.length === 0
              : users.length === 0) && (
              <Text color="neutral.600" my={8} width="full" textAlign="center">
                No User Found.
              </Text>
            )}
          {!externalLoading &&
            !isLoading &&
            (users.length > 0 ||
              (externalUsers && externalUsers.length > 0)) && (
              <VStack
                width="full"
                spacing="8px"
                opacity={searchLoading || externalSearchLoading ? 0.7 : 1}
              >
                {(externalUsers ?? users)?.map((user, index) => (
                  <HStack
                    width="full"
                    justifyContent="space-between"
                    key={index}
                    as="button"
                    onClick={() => {
                      handleSelectUser && handleSelectUser(user);
                    }}
                  >
                    <HStack spacing="8px">
                      <Avatar
                        width="40px"
                        height="40px"
                        name={`${user.firstName} ${user.lastName}`}
                        size="md"
                      />
                      <VStack spacing="4px" alignItems="flex-start">
                        <Text>{`${user.firstName} ${user.lastName}`}</Text>
                        <Text
                          fontSize="10px"
                          lineHeight="11.88px"
                          color="neutral.600"
                        >
                          {user.firstName}
                        </Text>
                      </VStack>
                    </HStack>
                    {type === 'edit' && (
                      <Icon
                        as={CloseIcon}
                        color="#F50000"
                        boxSize="12px"
                        cursor="pointer"
                      />
                    )}
                  </HStack>
                ))}
              </VStack>
            )}
        </InfiniteScroll>
      </ModalBody>
    </GenericModal>
  );
};

export default UserSelectSecondaryModal;
