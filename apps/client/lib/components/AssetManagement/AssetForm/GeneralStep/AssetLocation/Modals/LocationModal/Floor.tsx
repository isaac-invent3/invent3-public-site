/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import AddButton from '../../../../../../UI/Form/FormAddButton';
import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/asset.interfaces';
import FloorModal from '../FloorModal';
import FloorSelect from '../SelectInputs/FloorSelect';

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
        <AddButton handleClick={onOpen}>Add New Floor</AddButton>
      </VStack>
      <FloorModal
        isOpen={isOpen}
        onClose={onClose}
        defaultBuildingId={buildingId}
      />
    </>
  );
};

export default Floor;
