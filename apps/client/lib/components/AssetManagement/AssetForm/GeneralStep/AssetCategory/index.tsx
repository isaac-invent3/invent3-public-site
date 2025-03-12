import {
  Grid,
  GridItem,
  SimpleGrid,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import CategorySelect from './CategorySelect';
import CategoryModal from './Modals/CategoryModal';
import SubCategoryModal from './Modals/SubCategoryModal';
import SubCategorySelect from './SubCategorySelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { useState } from 'react';
import { FormAddButton } from '@repo/ui/components';

const AssetCategory = () => {
  const dispatch = useAppDispatch();
  const { categoryId } = useAppSelector((state) => state.asset.assetForm);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    categoryId
  );
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenSubCategory,
    onClose: onCloseSubCategory,
    onOpen: onOpenSubCategory,
  } = useDisclosure();

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="11px" width="full">
      <GridItem colSpan={4}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: '16px', md: '11px' }}
          alignItems="flex-start"
        >
          <VStack alignItems="flex-end" width="full">
            <CategorySelect
              handleSelect={(option) => {
                setSelectedCategory(option.value as number);
                dispatch(
                  updateAssetForm({
                    categoryName: option.label,
                  })
                );
              }}
            />
            <FormAddButton handleClick={onOpen}>Add New Category</FormAddButton>
          </VStack>
          <VStack alignItems="flex-end" width="full">
            <SubCategorySelect
              categoryId={selectedCategory}
              handleSelect={(option) => {
                dispatch(updateAssetForm({ subCategoryName: option.label }));
              }}
            />
            <FormAddButton handleClick={onOpenSubCategory}>
              Add New Subcategory
            </FormAddButton>
          </VStack>
        </SimpleGrid>
      </GridItem>
      <CategoryModal isOpen={isOpen} onClose={onClose} />
      <SubCategoryModal
        isOpen={isOpenSubCategory}
        onClose={onCloseSubCategory}
        defaultCategory={selectedCategory}
      />
    </Grid>
  );
};

export default AssetCategory;
