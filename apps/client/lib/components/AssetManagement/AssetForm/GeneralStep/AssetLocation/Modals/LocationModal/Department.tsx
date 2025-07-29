/* eslint-disable no-unused-vars */
import { useDisclosure, VStack } from '@chakra-ui/react';

import { Option } from '~/lib/interfaces/general.interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import DepartmentModal from '../DepartmentModal';
import DepartmentSelect from '../SelectInputs/DepartmentSelect';
import { FormAddButton } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';

interface DepartmentProps {
  handleReadableLocation: (option: Option, key: keyof FormLocation) => void;
}
const Department = (props: DepartmentProps) => {
  const { handleReadableLocation } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { floor, department } = useAppSelector(
    (state) => state.location.localLocation
  );

  return (
    <>
      <VStack alignItems="flex-end" width="full">
        <DepartmentSelect
          handleSelect={(option) =>
            handleReadableLocation(option, 'department')
          }
          floorId={(floor?.value as number) ?? null}
          selectedOption={department}
          type="specificById"
        />
        <FormAddButton handleClick={onOpen}>Add New Department</FormAddButton>
      </VStack>
      <DepartmentModal
        isOpen={isOpen}
        onClose={onClose}
        defaultFloorId={(floor?.value as number) ?? null}
        handleReadableLocation={handleReadableLocation}
      />
    </>
  );
};

export default Department;
