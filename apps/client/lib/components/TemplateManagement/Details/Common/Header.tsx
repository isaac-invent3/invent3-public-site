import { HStack, useDisclosure } from '@chakra-ui/react';
import { Button, GenericDeleteModal } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import PageHeader from '~/lib/components/UI/PageHeader';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useAppSelector } from '~/lib/redux/hooks';
import { useDeleteTemplateMutation } from '~/lib/redux/services/template.services';
import { ROUTES } from '~/lib/utils/constants';
import EditTemplateDrawer from '../EditTemplateDrawer';

const DetailHeader = () => {
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
  const template = useAppSelector((state) => state.template.template);
  const { handleSubmit } = useCustomMutation();
  const [deleteTemplate, { isLoading }] = useDeleteTemplateMutation({});
  const router = useRouter();

  const handleDeleteTemplate = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteTemplate,
      { id: template?.templateId!, deletedBy: session?.user.username! },
      'Template Deleted Successfully'
    );
    router.push(`/${ROUTES.TEMPLATES}`);
    if (response?.data) {
      onCloseDelete();
    }
  };
  return (
    <>
      <HStack
        width="full"
        justifyContent="space-between"
        pb="16px"
        borderBottomWidth="1px"
        borderColor="neutral.300"
      >
        <PageHeader>Template Detail</PageHeader>
        <HStack spacing="8px">
          <Button
            customStyles={{ height: '35px', width: '117px', px: '8px' }}
            variant="primary"
            handleClick={onOpenEdit}
          >
            Edit Template
          </Button>
          <Button
            customStyles={{ height: '35px', width: '117px', px: '8px' }}
            variant="secondary"
            handleClick={onOpenDelete}
          >
            Delete Template
          </Button>
        </HStack>
      </HStack>
      {isOpenDelete && (
        <GenericDeleteModal
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          handleDelete={handleDeleteTemplate}
          isLoading={isLoading}
        />
      )}
      {isOpenEdit && (
        <EditTemplateDrawer isOpen={isOpenEdit} onClose={onCloseEdit} />
      )}
    </>
  );
};

export default DetailHeader;
