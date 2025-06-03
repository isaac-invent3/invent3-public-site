import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import React from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { ComplianceRegulation } from '~/lib/interfaces/asset/compliance.interfaces';
import { useDeleteComplianceRegulationMutation } from '~/lib/redux/services/asset/compliance.services';

interface PopoverActionProps {
  data: ComplianceRegulation;
}

const PopoverAction = (props: PopoverActionProps) => {
  const { data } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { handleSubmit } = useCustomMutation();
  const [deleteComplianceRegulation, { isLoading }] =
    useDeleteComplianceRegulationMutation({});

  const handleDeleteComplianceRegulation = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteComplianceRegulation,
      { id: data?.regulationId, deletedBy: session?.user.username! },
      'Compliance Deleted Successfully'
    );
    if (response?.data) {
      onClose();
    }
  };

  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text
            cursor="pointer"
            onClick={() => {
              onOpen();
            }}
          >
            Delete
          </Text>
        </VStack>
      </GenericPopover>
      <GenericDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDeleteComplianceRegulation}
        isLoading={isLoading}
      />
    </>
  );
};

export default PopoverAction;
