import { HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { GenericDeleteModal } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import { DeleteIcon, PenIcon } from '~/lib/components/CustomIcons';
import { EditIcon } from '~/lib/components/CustomIcons/Dashboard';
import {
  FacilitiesInterface,
  FacilityFormInterface,
} from '~/lib/interfaces/location.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';

const ActionPopover = (
  info: FacilityFormInterface,
  handleEditFacility: (facility: FacilityFormInterface) => void,
  setFacilityLists: React.Dispatch<
    React.SetStateAction<FacilityFormInterface[]>
  >
) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { values, setFieldValue } = useFormikContext<FacilitiesInterface>();

  const handleDeleteFacility = async () => {
    const newFacilities = values.facilities.filter(
      (item) => item.localId !== info.localId
    );
    setFieldValue('facilities', newFacilities);
    setFacilityLists(newFacilities.filter((items) => items.localId !== null));
  };

  return (
    <>
      <HStack spacing="16px">
        <Icon
          as={PenIcon}
          color="#212121"
          boxSize="20px"
          cursor="pointer"
          onClick={() => handleEditFacility(info)}
        />
        <Icon
          as={DeleteIcon}
          color="#F50000"
          boxSize="20px"
          cursor="pointer"
          onClick={onOpen}
        />
      </HStack>

      {isOpen && (
        <GenericDeleteModal
          isOpen={isOpen}
          onClose={onClose}
          handleDelete={handleDeleteFacility}
        />
      )}
    </>
  );
};

export default ActionPopover;
