/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import AisleModal from '../AisleModal';
import AisleSelect from '../SelectInputs/AisleSelect';
import { FormAddButton } from '@repo/ui/components';

interface AisleProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
  roomId: number | null;
}
const Aisle = (props: AisleProps) => {
  const { handleReadableLocation, roomId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <AisleSelect
          handleSelect={(option) => handleReadableLocation(option, 'aisle')}
          type="specificById"
          roomId={roomId}
        />
        <FormAddButton handleClick={onOpen}>Add New Aisle</FormAddButton>
      </VStack>
      <AisleModal
        isOpen={isOpen}
        onClose={onClose}
        defaultRoomId={roomId}
        handleReadableLocation={handleReadableLocation}
      />
    </>
  );
};

export default Aisle;
