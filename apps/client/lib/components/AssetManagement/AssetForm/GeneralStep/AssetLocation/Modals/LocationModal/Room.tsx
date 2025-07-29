/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import RoomSelect from '../SelectInputs/RoomSelect';
import RoomModal from '../RoomModal';
import { FormAddButton } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';

interface RoomProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
}
const Room = (props: RoomProps) => {
  const { handleReadableLocation } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { department, room } = useAppSelector(
    (state) => state.location.localLocation
  );
  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <RoomSelect
          handleSelect={(option) => handleReadableLocation(option, 'room')}
          departmentId={(department?.value as number) ?? null}
          selectedOption={room}
          type="specificById"
        />
        <FormAddButton handleClick={onOpen}>Add New Room</FormAddButton>
      </VStack>
      <RoomModal
        isOpen={isOpen}
        onClose={onClose}
        defaultDepartmentId={(department?.value as number) ?? null}
        handleReadableLocation={handleReadableLocation}
      />
    </>
  );
};

export default Room;
