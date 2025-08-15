import { Icon, Text, useDisclosure, VStack } from '@chakra-ui/react';
import {
  Button,
  GenericDeleteModal,
  GenericPopover,
} from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Facility } from '~/lib/interfaces/location.interfaces';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';
import {
  facilityApi,
  useDeleteFacilityMutation,
} from '~/lib/redux/services/location/facility.services';
import EditFacilityModal from '../../../LocationModals/EditModals/EditFacilityModal';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useEffect } from 'react';

const FacilityPopoverAction = ({
  data,
  closeDrawer,
}: {
  data: Facility;
  closeDrawer: () => void;
}) => {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [deleteBuilding, { isLoading }] = useDeleteFacilityMutation();
  const { handleSubmit } = useCustomMutation();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteBuilding,
      { id: data.facilityId, deletedBy: session?.user.username! },
      'Facility Deleted Successfully'
    );
    if (response?.data) {
      dispatch(facilityApi.util.invalidateTags(['facilitiesByStateId']));
      onCloseDelete();
      closeDrawer();
    }
  };

  return (
    <>
      <GenericPopover
        width="100px"
        placement="auto"
        popoverTriggerElement={
          <Button
            variant="secondary"
            customStyles={{ width: '81px', height: '35px' }}
          >
            More
            <Icon
              as={ChevronDownIcon}
              color="neutral.800"
              boxSize="16px"
              ml="8px"
            />
          </Button>
        }
      >
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text onClick={onOpenEdit} cursor="pointer">
            Edit
          </Text>
          <Text color="#F50000" cursor="pointer" onClick={onOpenDelete}>
            Delete
          </Text>
        </VStack>
      </GenericPopover>
      <GenericDeleteModal
        isLoading={isLoading}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        handleDelete={handleDelete}
        modalHeader="Delete Facility?"
      />
      <EditFacilityModal
        data={data}
        onClose={onCloseEdit}
        handleSuccess={() => {
          dispatch(facilityApi.util.invalidateTags(['facilitiesByStateId']));
          onCloseEdit();
          closeDrawer();
        }}
        isOpen={isOpenEdit}
        showSuccessMessage
      />
    </>
  );
};

export default FacilityPopoverAction;
