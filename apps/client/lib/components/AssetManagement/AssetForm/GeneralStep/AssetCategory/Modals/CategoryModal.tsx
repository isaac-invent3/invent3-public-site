import { useAppFormik } from '~/lib/hooks/useAppFormik';
/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useField } from 'formik';

import {
  Button,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { categorySchema } from '~/lib/schemas/asset/category.schema';
import { useCreateCategoryMutation } from '~/lib/redux/services/asset/category.services';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
}
const CategoryModal = (props: CategoryModalProps) => {
  const { isOpen, onClose, setSelectedCategory } = props;
  const [createCategory, { isLoading }] = useCreateCategoryMutation({});
  const { handleSubmit } = useCustomMutation();
  const [field, meta, helpers] = useField('categoryId');
  const dispatch = useAppDispatch();

  const formik = useAppFormik({
    initialValues: {
      categoryName: '',
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        createdBy: session?.user?.username ?? '',
      };
      const response = await handleSubmit(createCategory, finalValue, '');
      if (response?.data) {
        helpers.setValue(response?.data?.data?.categoryId);
        setSelectedCategory(response?.data?.data?.categoryId);
        dispatch(
          updateAssetForm({
            categoryName: response?.data?.data?.categoryName!,
          })
        );
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
                heading="Add New Category"
                subheading="Add a new category that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <Field
                  as={FormTextInput}
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
