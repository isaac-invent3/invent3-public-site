/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import SelectInput from '~/lib/components/UI/Select';
import { useGetAllAislesQuery } from '~/lib/redux/services/asset/location.services';
import { generateOptions } from '~/lib/utils/helperFunctions';
import AddButton from '../../../../AddButton';
import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/asset.interfaces';
import AisleModal from '../AisleModal';

interface AisleProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
}
const Aisle = (props: AisleProps) => {
  const { handleReadableLocation } = props;
  const { data, isLoading } = useGetAllAislesQuery({ pageSize: 25 });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <SelectInput
          name="aisleId"
          title="Aisle"
          options={generateOptions(data?.data?.items, 'aisleName', 'aisleId')}
          isLoading={isLoading}
          isSearchable
          handleSelect={(option) => handleReadableLocation(option, 'aisle')}
        />
        <AddButton handleClick={onOpen}>Add New Aisle</AddButton>
      </VStack>
      <AisleModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Aisle;
