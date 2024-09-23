/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { useGetAllAislesQuery } from '~/lib/redux/services/asset/location.services';
import AddButton from '../../../../AddButton';
import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/asset.interfaces';
import AisleModal from '../AisleModal';
import AisleSelect from '../SelectInputs/AisleSelect';

interface AisleProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
  roomId: number | null;
}
const Aisle = (props: AisleProps) => {
  const { handleReadableLocation, roomId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <AisleSelect
          handleSelect={(option) => handleReadableLocation(option, 'aisle')}
          type="specificById"
          roomId={roomId}
        />
        <AddButton handleClick={onOpen}>Add New Aisle</AddButton>
      </VStack>
      <AisleModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Aisle;
