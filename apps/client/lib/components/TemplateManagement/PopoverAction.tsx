import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { Template } from '~/lib/interfaces/template.interfaces';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { useDeleteTemplateMutation } from '~/lib/redux/services/template.services';

const PopoverAction = (template: Template) => {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const { handleSubmit } = useCustomMutation();
  const [deleteTemplate, { isLoading }] = useDeleteTemplateMutation({});

  const handleDeletePlan = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteTemplate,
      { id: template?.templateId, deletedBy: session?.user.username! },
      'Template Deleted Successfully'
    );
    if (response?.data) {
      onCloseDelete();
    }
  };

  return (
    <>
      <GenericPopover width="129px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer" onClick={onOpenDelete} color="#F50000">
            Delete
          </Text>
        </VStack>
      </GenericPopover>
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
