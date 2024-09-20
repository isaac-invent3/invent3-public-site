/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import SelectInput from '~/lib/components/UI/Select';
import AddButton from '../../../../AddButton';
import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/asset.interfaces';
import BuildingModal from '../BuildingModal';
import BuildingSelect from '../SelectInputs/BuildingSelect';

interface BuildingProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
  facilityId: number | undefined;
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
        <AddButton handleClick={onOpen}>Add New Building</AddButton>
      </VStack>
      <BuildingModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Building;
