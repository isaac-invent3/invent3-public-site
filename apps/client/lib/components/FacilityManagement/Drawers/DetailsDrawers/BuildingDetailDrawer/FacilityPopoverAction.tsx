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
import { useRouter } from 'next/navigation';
import { useDeleteFacilityMutation } from '~/lib/redux/services/location/facility.services';
import { ROUTES } from '~/lib/utils/constants';
import EditFacilityModal from '../../../LocationModals/EditModals/EditFacilityModal';

const FacilityPopoverAction = ({ data }: { data: Facility }) => {
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
  const router = useRouter();

  const handleDelete = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteBuilding,
      { id: data.facilityId, deletedBy: session?.user.username! },
      'Facility Deleted Successfully'
    );
    if (response?.data) {
      onCloseDelete();
      router.push(`/${ROUTES.LOCATION}/${data?.stateId}`);
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
        isOpen={isOpenEdit}
      />
    </>
  );
};

export default FacilityPopoverAction;
