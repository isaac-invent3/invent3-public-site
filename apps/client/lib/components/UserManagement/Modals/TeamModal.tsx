/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useField, useFormik } from 'formik';

import {
  Button,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { teamSchema } from '~/lib/schemas/team.schema';
import { useCreateTeamMutation } from '~/lib/redux/services/team.services';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const TeamModal = (props: TeamModalProps) => {
  const { isOpen, onClose } = props;
  const [createTeam, { isLoading }] = useCreateTeamMutation({});
  const { handleSubmit } = useCustomMutation();
  const [field, meta, helpers] = useField('teamIds');
  const dispatch = useAppDispatch();
  const { teamNames } = useAppSelector((state) => state.user.userForm);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: teamSchema,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        createdBy: session?.user?.username ?? '',
      };
      const response = await handleSubmit(createTeam, finalValue, '');
      if (response?.data) {
        helpers.setValue([...meta.value, response?.data?.data?.teamId]);
        dispatch(
          updateUserForm({
            teamNames: [...teamNames, response?.data?.data?.name!],
          })
        );
        resetForm();
        onClose();
      }
    },
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { sm: '450px' } }}
    >
      <ModalBody p={0} m={0} width="full">
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              width="full"
              spacing="32px"
              p={{ base: '24px', md: '40px' }}
            >
              <ModalHeading
                heading="Add New Team"
                subheading="Add a new team that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <Field
                  as={FormTextInput}
                  name="name"
                  type="text"
                  label="Team Name"
                />
              </VStack>
              {/* Main Form Ends Here */}
              <HStack width="full" spacing="24px">
                <Button
                  variant="secondary"
                  customStyles={{ width: '96px' }}
                  handleClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading || formik.isSubmitting}
                >
                  Add Team
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default TeamModal;
