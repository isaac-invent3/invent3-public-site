/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import AddButton from '../../../../AddButton';
import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/asset.interfaces';
import ShelfModal from '../ShelfModal';
import ShelfSelect from '../SelectInputs/ShelfSelect';

interface ShelfProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
  aisleId: number | null;
}
const Shelf = (props: ShelfProps) => {
  const { handleReadableLocation, aisleId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <ShelfSelect
          handleSelect={(option) => handleReadableLocation(option, 'shelf')}
          aisleId={aisleId}
          type="specificById"
        />
        <AddButton handleClick={onOpen}>Add New Shelf</AddButton>
      </VStack>
      <ShelfModal isOpen={isOpen} onClose={onClose} defaultAisleId={aisleId} />
    </>
  );
};

export default Shelf;
