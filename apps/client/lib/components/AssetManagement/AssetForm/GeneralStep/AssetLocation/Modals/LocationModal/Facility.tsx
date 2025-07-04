/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import FacilityModal from '../FacilityModal';
import FacilitySelect from '../SelectInputs/FacilitySelect';
import { FormAddButton } from '@repo/ui/components';

interface FacilityProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
  lgaId: number | null;
  stateId: number | null;
}
const Facility = (props: FacilityProps) => {
  const { handleReadableLocation, lgaId, stateId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <FacilitySelect
          handleSelect={(option) => handleReadableLocation(option, 'facility')}
          lgaId={lgaId}
          type="specificById"
        />
        <FormAddButton handleClick={onOpen}>Add New Facility</FormAddButton>
      </VStack>
      <FacilityModal
        isOpen={isOpen}
        onClose={onClose}
        defaultLGAId={lgaId}
        stateId={stateId}
      />
    </>
  );
};

export default Facility;
