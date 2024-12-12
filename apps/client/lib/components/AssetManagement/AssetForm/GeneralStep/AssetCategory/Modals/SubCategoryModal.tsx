/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import {
  Button,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { subCategorySchema } from '~/lib/schemas/asset/category.schema';
import { useCreateSubCategoryMutation } from '~/lib/redux/services/asset/category.services';
import CategorySelect from '../CategorySelect';
import { getSession } from 'next-auth/react';

interface SubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory: number | null;
}
const SubCategoryModal = (props: SubCategoryModalProps) => {
  const { isOpen, onClose, defaultCategory } = props;
  const [createSubCategory, { isLoading }] = useCreateSubCategoryMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      categoryId: defaultCategory ?? null,
      categoryName: null,
    },
    validationSchema: subCategorySchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const session = await getSession();
      const finalValue = { ...values, createdBy: session?.user?.username };
      const response = await handleSubmit(createSubCategory, finalValue, '');
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
                heading="Add New Subcategory"
                subheading="Add a new sub-category that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <CategorySelect />
                <Field
                  as={FormTextInput}
                  name="subCategoryName"
                  type="text"
                  label="Name"
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
                  Add Subcategory
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default SubCategoryModal;
