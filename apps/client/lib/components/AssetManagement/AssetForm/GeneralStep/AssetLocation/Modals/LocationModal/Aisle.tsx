/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import AisleModal from '../AisleModal';
import AisleSelect from '../SelectInputs/AisleSelect';
import { FormAddButton } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';

interface AisleProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
}
const Aisle = (props: AisleProps) => {
  const { handleReadableLocation } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { room, aisle } = useAppSelector(
    (state) => state.location.localLocation
  );

  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <AisleSelect
          handleSelect={(option) => handleReadableLocation(option, 'aisle')}
          type="specificById"
          roomId={room?.value as number}
          selectedOption={aisle}
        />
        <FormAddButton handleClick={onOpen}>Add New Aisle</FormAddButton>
      </VStack>
      <AisleModal
        isOpen={isOpen}
        onClose={onClose}
        defaultRoomId={room?.value as number}
        handleReadableLocation={handleReadableLocation}
      />
    </>
  );
};

export default Aisle;
