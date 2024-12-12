/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import AddButton from '../../../../../../UI/Form/FormAddButton';
import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/asset.interfaces';
import DepartmentModal from '../DepartmentModal';
import DepartmentSelect from '../SelectInputs/DepartmentSelect';

interface DepartmentProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
  floorId: number | null;
}
const Department = (props: DepartmentProps) => {
  const { handleReadableLocation, floorId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <DepartmentSelect
          handleSelect={(option) =>
            handleReadableLocation(option, 'department')
          }
          floorId={floorId}
          type="specificById"
        />
        <AddButton handleClick={onOpen}>Add New Department</AddButton>
      </VStack>
      <DepartmentModal
        isOpen={isOpen}
        onClose={onClose}
        defaultFloorId={floorId}
      />
    </>
  );
};

export default Department;
