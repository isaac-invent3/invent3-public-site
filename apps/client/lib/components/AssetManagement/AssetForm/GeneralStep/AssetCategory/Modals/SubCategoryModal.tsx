/* eslint-disable no-unused-vars */
import { HStack, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import TextInput from '~/lib/components/UI/TextInput';
import ModalHeading from '~/lib/components/UI/ModalHeading';
import { subCategorySchema } from '~/lib/schemas/asset/category.schema';
import { useCreateSubCategoryMutation } from '~/lib/redux/services/asset/category.services';
import CategorySelect from '../CategorySelect';

interface SubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory: number | null;
}
const SubCategoryModal = (props: SubCategoryModalProps) => {
  const { isOpen, onClose, defaultCategory } = props;
  const [createSubCategory, { isLoading }] = useCreateSubCategoryMutation({});
  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();

  const formik = useFormik({
    initialValues: {
      categoryId: defaultCategory ?? null,
      categoryName: null,
    },
    validationSchema: subCategorySchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const finalValue = { ...values, createdBy: data?.user?.username };
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
                as={TextInput}
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
              <Button type="submit" isLoading={isLoading}>
                Add Subcategory
              </Button>
            </HStack>
          </VStack>
        </form>
      </FormikProvider>
    </GenericModal>
  );
};

export default SubCategoryModal;
