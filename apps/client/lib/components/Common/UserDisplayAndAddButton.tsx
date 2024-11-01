import { HStack, Icon, IconButton, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { AddIcon, CloseIcon } from '../CustomIcons';
import { Option } from '~/lib/interfaces/general.interfaces';
import UserInfo from './UserInfo';
import UserSelectModal from './Modals/UserSelectModal';

interface UserDisplayAndAddButtonProps {
  selectedUser: string | null | undefined;
  // eslint-disable-next-line no-unused-vars
  handleSelectUser: (user: Option | null) => void;
  sectionInfoText?: string;
  customAvatarStyle?: { [name: string]: unknown };
}

const UserDisplayAndAddButton = (props: UserDisplayAndAddButtonProps) => {
  const { selectedUser, handleSelectUser, sectionInfoText, customAvatarStyle } =
    props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack>
        {selectedUser ? (
          <HStack cursor="pointer" role="group">
            <UserInfo
              name={selectedUser}
              customAvatarStyle={{
                width: '50px',
                height: '50px',
                fontWeight: 700,
                ...customAvatarStyle,
              }}
            />
            <Icon
              as={CloseIcon}
              boxSize="16px"
              color="black"
              visibility="hidden"
              _groupHover={{ visibility: 'visible' }}
              transition="all 0.3s ease"
              cursor="pointer"
              onClick={() => {
                handleSelectUser(null);
              }}
            />
          </HStack>
        ) : (
          <IconButton
            variant="solid"
            bgColor="#F1F1F1"
            aria-label="Add User"
            icon={<AddIcon color="#374957" boxSize="24px" />}
            sx={{ width: '50px', height: '50px', rounded: 'full' }}
            onClick={onOpen}
          />
        )}
      </HStack>
      <UserSelectModal
        isOpen={isOpen}
        onClose={onClose}
        handleSelectUser={handleSelectUser}
        sectionInfoText={sectionInfoText}
      />
    </>
  );
};

export default UserDisplayAndAddButton;
