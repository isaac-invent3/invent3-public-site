/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import ShelfModal from '../ShelfModal';
import ShelfSelect from '../SelectInputs/ShelfSelect';
import { FormAddButton } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';

interface ShelfProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
}
const Shelf = (props: ShelfProps) => {
  const { handleReadableLocation } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { aisle, shelf } = useAppSelector(
    (state) => state.location.localLocation
  );
  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <ShelfSelect
          handleSelect={(option) => handleReadableLocation(option, 'shelf')}
          aisleId={(aisle?.value as number) ?? null}
          selectedOption={shelf}
          type="specificById"
        />
        <FormAddButton handleClick={onOpen}>Add New Shelf</FormAddButton>
      </VStack>
      <ShelfModal
        isOpen={isOpen}
        onClose={onClose}
        defaultAisleId={(aisle?.value as number) ?? null}
        handleReadableLocation={handleReadableLocation}
      />
    </>
  );
};

export default Shelf;
