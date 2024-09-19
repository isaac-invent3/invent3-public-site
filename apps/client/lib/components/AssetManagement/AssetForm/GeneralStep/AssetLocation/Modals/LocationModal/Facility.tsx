/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import AddButton from '../../../../AddButton';
import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/asset.interfaces';
import FacilityModal from '../FacilityModal';
import FacilitySelect from '../SelectInputs/FacilitySelect';

interface FacilityProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
}
const Facility = (props: FacilityProps) => {
  const { handleReadableLocation } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <FacilitySelect
          handleSelect={(option) => handleReadableLocation(option, 'facility')}
        />
        <AddButton handleClick={onOpen}>Add New Facility</AddButton>
      </VStack>
      <FacilityModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Facility;
