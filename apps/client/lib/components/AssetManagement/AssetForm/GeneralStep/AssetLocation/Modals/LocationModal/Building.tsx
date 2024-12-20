/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import BuildingModal from '../BuildingModal';
import BuildingSelect from '../SelectInputs/BuildingSelect';
import { FormAddButton } from '@repo/ui/components';

interface BuildingProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
  facilityId: number | null;
}
const Building = (props: BuildingProps) => {
  const { handleReadableLocation, facilityId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <BuildingSelect
          handleSelect={(option) => handleReadableLocation(option, 'building')}
          facilityId={facilityId}
          type="specificById"
        />
        <FormAddButton handleClick={onOpen}>Add New Building</FormAddButton>
      </VStack>
      <BuildingModal
        isOpen={isOpen}
        onClose={onClose}
        defaultFacilityId={facilityId}
      />
    </>
  );
};

export default Building;
