/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import AddButton from '../../../../AddButton';
import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/asset.interfaces';
import RoomSelect from '../SelectInputs/RoomSelect';
import RoomModal from '../RoomModal';

interface RoomProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
  departmentId: number | null;
}
const Room = (props: RoomProps) => {
  const { handleReadableLocation, departmentId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <RoomSelect
          handleSelect={(option) => handleReadableLocation(option, 'room')}
          departmentId={departmentId}
          type="specificById"
        />
        <AddButton handleClick={onOpen}>Add New Room</AddButton>
      </VStack>
      <RoomModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Room;
