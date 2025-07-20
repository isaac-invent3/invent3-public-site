/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import RoomSelect from '../SelectInputs/RoomSelect';
import RoomModal from '../RoomModal';
import { FormAddButton } from '@repo/ui/components';

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
        <FormAddButton handleClick={onOpen}>Add New Room</FormAddButton>
      </VStack>
      <RoomModal
        isOpen={isOpen}
        onClose={onClose}
        defaultDepartmentId={departmentId}
        handleReadableLocation={handleReadableLocation}
      />
    </>
  );
};

export default Room;
