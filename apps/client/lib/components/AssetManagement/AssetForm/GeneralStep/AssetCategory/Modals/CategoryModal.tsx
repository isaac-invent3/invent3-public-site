/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import { Button, GenericModal, ModalHeading } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import TextInput from '~/lib/components/UI/TextInput';
import { categorySchema } from '~/lib/schemas/asset/category.schema';
import { useCreateCategoryMutation } from '~/lib/redux/services/asset/category.services';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const CategoryModal = (props: CategoryModalProps) => {
  const { isOpen, onClose } = props;
  const [createCategory, { isLoading }] = useCreateCategoryMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      categoryName: null,
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      const session = await getSession();
      const finalValue = { ...values, createdBy: session?.user?.username };
      const response = await handleSubmit(createCategory, finalValue, '');
      if (response?.data) {
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
            <VStack width="full" spacing="32px" p="40px">
              <ModalHeading
                heading="Add New Category"
                subheading="Add a new category that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <Field
                  as={TextInput}
                  name="categoryName"
                  type="text"
                  label="Category Name"
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
                  Add Category
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default CategoryModal;
