/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import { Vendor } from '~/lib/interfaces/vendor.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useDeleteVendorMutation } from '~/lib/redux/services/vendor.services';
import { setVendor } from '~/lib/redux/slices/VendorSlice';
import { ROUTES, SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';

interface PopoverActionProps {
  vendor: Vendor;
}

const PopoverAction = ({ vendor }: PopoverActionProps) => {
  const dispatch = useAppDispatch();
  const { updateSearchParam } = useCustomSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit } = useCustomMutation();
  const [deleteTemplate, { isLoading }] = useDeleteVendorMutation({});
  const canDeleteVendor = usePermissionAccess('vendor:delete');
  const canEditVendor = usePermissionAccess('vendor:edit');

  const handleDeletePlan = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteTemplate,
      { id: vendor?.vendorId, deletedBy: session?.user.username! },
      'Vendor Deleted Successfully'
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
              dispatch(setVendor(vendor));
              updateSearchParam(
                SYSTEM_CONTEXT_DETAILS.VENDOR.slug,
                vendor.vendorId
              );
            }}
          >
            View Details
          </Text>
          <Text cursor="pointer">Rate a Partner</Text>
          {canEditVendor && (
            <Text
              cursor="pointer"
              as="a"
              href={`/${ROUTES.VENDOR}/${vendor.vendorId}/edit`}
            >
              Edit
            </Text>
          )}
          {canDeleteVendor && (
            <Text cursor="pointer" color="red.500" onClick={() => onOpen()}>
              Delete
            </Text>
          )}
        </VStack>
      </GenericPopover>
      {isOpen && (
        <GenericDeleteModal
          isOpen={isOpen}
          onClose={onClose}
          handleDelete={handleDeletePlan}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default PopoverAction;
