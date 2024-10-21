import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import GenericPopover from '../../UI/GenericPopover';
import PlanDetailsModal from './Modals/PlanDetailModal';
import GenericDeleteModal from '../../UI/Modal/GenericDeleteModal';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useDeleteMaintenancePlanMutation } from '~/lib/redux/services/maintenance/plan.services';
import { useSession } from 'next-auth/react';

const PopoverAction = (plan: MaintenancePlan) => {
  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onClose: onCloseView,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const { handleSubmit } = useCustomMutation();
  const [deleteTask, { isLoading }] = useDeleteMaintenancePlanMutation({});
  const { data } = useSession();

  const handleDeletePlan = async () => {
    const response = await handleSubmit(
      deleteTask,
      { id: plan?.maintenancePlanId, deletedBy: data?.user.username },
      'Task Deleted Successfully'
    );
    if (response?.data) {
      onCloseDelete();
    }
  };

  return (
    <>
      <GenericPopover width="129px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text
            cursor="pointer"
            as="a"
            href={`/maintenance/plans/${plan.maintenancePlanId}/edit`}
          >
            Edit
          </Text>
          <Text cursor="pointer" onClick={onOpenView}>
            View
          </Text>
          <Text cursor="pointer" onClick={onOpenDelete} color="#F50000">
            Delete
          </Text>
        </VStack>
      </GenericPopover>
      {isOpenView && (
        <PlanDetailsModal
          isOpen={isOpenView}
          onClose={onCloseView}
          data={plan}
        />
      )}
      {isOpenDelete && (
        <GenericDeleteModal
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          handleDelete={handleDeletePlan}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default PopoverAction;
