/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import FacilityModal from '../FacilityModal';
import FacilitySelect from '../SelectInputs/FacilitySelect';
import { FormAddButton } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';

interface FacilityProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
}
const Facility = (props: FacilityProps) => {
  const { handleReadableLocation } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { lga, state, facility } = useAppSelector(
    (state) => state.location.localLocation
  );
  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <FacilitySelect
          handleSelect={(option) => handleReadableLocation(option, 'facility')}
          lgaId={(lga?.value as number) ?? null}
          type="specificById"
          selectedOption={facility}
        />
        <FormAddButton handleClick={onOpen}>Add New Facility</FormAddButton>
      </VStack>
      <FacilityModal
        isOpen={isOpen}
        onClose={onClose}
        defaultLGAId={(lga?.value as number) ?? null}
        stateId={(state?.value as number) ?? null}
        handleReadableLocation={handleReadableLocation}
      />
    </>
  );
};

export default Facility;
