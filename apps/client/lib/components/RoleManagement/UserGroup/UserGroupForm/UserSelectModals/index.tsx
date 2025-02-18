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
import { GenericModal, SearchInput } from '@repo/ui/components';
import React from 'react';
import { CloseIcon } from '~/lib/components/CustomIcons';
import { User } from '~/lib/interfaces/user.interfaces';

interface UserSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'select' | 'edit';
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  data: User[];
  // eslint-disable-next-line no-unused-vars
  handleSelectUser?: (user: User) => void;
}
const UserSelectModal = (props: UserSelectModalProps) => {
  const { isOpen, onClose, type, setSearch, data, handleSelectUser } = props;

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
        <VStack spacing="24px">
          <HStack width="full" justifyContent="space-between">
            <Heading size={{ lg: 'md' }}>
              {type === 'select' ? 'Select User' : 'Edit User'}
            </Heading>
            <HStack spacing="8px" as="button" onClick={onClose}>
              <Text color="#F50000">Close</Text>
              <Icon as={CloseIcon} color="#F50000" boxSize="12px" />
            </HStack>
          </HStack>
          <SearchInput setSearch={setSearch} />
        </VStack>
      </ModalHeader>
      <ModalBody p={0} m={0} mt="24px">
        <VStack width="full" spacing="8px">
          {data?.map((user, index) => (
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
              <Icon
                as={CloseIcon}
                color="#F50000"
                boxSize="12px"
                cursor="pointer"
              />
            </HStack>
          ))}
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default UserSelectModal;
