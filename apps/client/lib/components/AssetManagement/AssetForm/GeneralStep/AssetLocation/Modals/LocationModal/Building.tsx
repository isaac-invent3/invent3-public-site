/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import BuildingModal from '../BuildingModal';
import BuildingSelect from '../SelectInputs/BuildingSelect';
import { FormAddButton } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';

interface BuildingProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
}
const Building = (props: BuildingProps) => {
  const { handleReadableLocation } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { facility, building } = useAppSelector(
    (state) => state.location.localLocation
  );

  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <BuildingSelect
          handleSelect={(option) => handleReadableLocation(option, 'building')}
          facilityId={(facility?.value as number) ?? null}
          selectedOption={building}
          type="specificById"
        />
        <FormAddButton handleClick={onOpen}>Add New Building</FormAddButton>
      </VStack>
      <BuildingModal
        isOpen={isOpen}
        onClose={onClose}
        defaultFacilityId={(facility?.value as number) ?? null}
        handleReadableLocation={handleReadableLocation}
      />
    </>
  );
};

export default Building;
