import { HStack, Text, useDisclosure } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import React from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { SLADefinition } from '~/lib/interfaces/sla.interfaces';
import { useDeleteSLADefintionMutation } from '~/lib/redux/services/settings/sla.services';
import SLARuleFormModal from './SLARuleFormDrawer';
import { GenericDeleteModal } from '@repo/ui/components';

interface ActionProps {
  data: SLADefinition;
}
const Action = ({ data }: ActionProps) => {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const { handleSubmit } = useCustomMutation();
  const [deletePlan, { isLoading }] = useDeleteSLADefintionMutation({});

  const handleDeleteSLA = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deletePlan,
      { id: data?.slaDefinitionId, deletedBy: session?.user.username! },
      'SLA Deleted Successfully'
    );
    if (response?.data) {
      onCloseDelete();
    }
  };
  return (
    <>
      <HStack spacing="24px">
        <Text
          cursor="pointer"
          onClick={onOpenEdit}
          color="blue.500"
          lineHeight="100%"
        >
          Edit
        </Text>
        <Text
          cursor="pointer"
          onClick={onOpenDelete}
          color="#F50000"
          lineHeight="100%"
        >
          Delete
        </Text>
      </HStack>
      <SLARuleFormModal isOpen={isOpenEdit} onClose={onCloseEdit} data={data} />
      {isOpenDelete && (
        <GenericDeleteModal
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          handleDelete={handleDeleteSLA}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default Action;
