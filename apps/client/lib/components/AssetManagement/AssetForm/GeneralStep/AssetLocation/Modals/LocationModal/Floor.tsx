/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import FloorModal from '../FloorModal';
import FloorSelect from '../SelectInputs/FloorSelect';
import { FormAddButton } from '@repo/ui/components';

interface FloorProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
  buildingId: number | null;
}
const Floor = (props: FloorProps) => {
  const { handleReadableLocation, buildingId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <FloorSelect
          handleSelect={(option) => handleReadableLocation(option, 'floor')}
          buildingId={buildingId}
          type="specificById"
        />
        <FormAddButton handleClick={onOpen}>Add New Floor</FormAddButton>
      </VStack>
      <FloorModal
        isOpen={isOpen}
        onClose={onClose}
        defaultBuildingId={buildingId}
        handleReadableLocation={handleReadableLocation}
      />
    </>
  );
};

export default Floor;
