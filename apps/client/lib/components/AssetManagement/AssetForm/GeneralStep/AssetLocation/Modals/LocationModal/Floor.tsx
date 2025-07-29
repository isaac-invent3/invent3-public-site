/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import FloorModal from '../FloorModal';
import FloorSelect from '../SelectInputs/FloorSelect';
import { FormAddButton } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';

interface FloorProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
}
const Floor = (props: FloorProps) => {
  const { handleReadableLocation } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { building, floor } = useAppSelector(
    (state) => state.location.localLocation
  );
  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <FloorSelect
          handleSelect={(option) => handleReadableLocation(option, 'floor')}
          buildingId={(building?.value as number) ?? null}
          selectedOption={floor}
          type="specificById"
        />
        <FormAddButton handleClick={onOpen}>Add New Floor</FormAddButton>
      </VStack>
      <FloorModal
        isOpen={isOpen}
        onClose={onClose}
        defaultBuildingId={(building?.value as number) ?? null}
        handleReadableLocation={handleReadableLocation}
      />
    </>
  );
};

export default Floor;
