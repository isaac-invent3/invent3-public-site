import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Button, FormInputWrapper, GenericModal } from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { assigneeSchema } from '~/lib/schemas/general.schema';
import UserSelect from '../../SelectComponents/UserSelect';

interface UserSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSelectUser: (option: Option) => void;
  sectionInfoText?: string;
  sectionInfoTitle?: string;
  buttonText?: string;
}

const UserSelectModal = (props: UserSelectModalProps) => {
  const {
    isOpen,
    onClose,
    handleSelectUser,
    sectionInfoText,
    sectionInfoTitle,
    buttonText,
  } = props;
  const [selectedUser, setSelectedUser] = useState<Option | null>(null);

  const formik = useFormik({
    initialValues: {
      assignee: null,
    },
    validationSchema: assigneeSchema,
    enableReinitialize: true,
    onSubmit: async (_, { resetForm }) => {
      if (selectedUser) {
        handleSelectUser(selectedUser);
      }
      resetForm();
      onClose();
    },
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { md: '526px' } }}
    >
      <ModalBody p={0} m={0} width="full">
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              width="full"
              spacing="79px"
              alignItems="flex-end"
              pl={{ base: '24px', md: '32px' }}
              pr={{ base: '24px', md: '50px' }}
              pt="56px"
              pb="32px"
            >
              <FormInputWrapper
                isRequired={false}
                sectionMaxWidth="125px"
                title={sectionInfoTitle ?? 'Assign'}
                customSpacing="40px"
                description={
                  sectionInfoText ??
                  'Select the person tasked with this responsibility'
                }
              >
                <UserSelect
                  selectName="assignee"
                  selectTitle="Enter User"
                  handleSelect={(option) => setSelectedUser(option)}
                  showTitleAfterSelect={false}
                />
              </FormInputWrapper>

              <HStack spacing="16px">
                <Button
                  variant="secondary"
                  customStyles={{ width: '116px' }}
                  handleClick={onClose}
                >
                  Cancel
                </Button>
                <Button customStyles={{ width: '116px' }} type="submit">
                  {buttonText ?? 'Assign'}
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default UserSelectModal;
