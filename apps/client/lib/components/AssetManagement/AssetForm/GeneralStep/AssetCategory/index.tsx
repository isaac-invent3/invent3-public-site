import {
  Flex,
  Grid,
  GridItem,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SelectInput from '~/lib/components/UI/Select';
import SectionInfo from '../../SectionInfo';
import AddButton from '../../AddButton';
import CategorySelect from './CategorySelect';
import { useSearchSubCategoryMutation } from '~/lib/redux/services/asset/category.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Option } from '~/lib/interfaces/general.interfaces';
import { generateOptions } from '~/lib/utils/helperFunctions';
import CategoryModal from './Modals/CategoryModal';
import SubCategoryModal from './Modals/SubCategoryModal';
import { OPERATORS } from '~/lib/utils/constants';

const AssetCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [pageNumber, setPageNumber] = useState(1);
  const [searchSubCategories, { isLoading }] = useSearchSubCategoryMutation({});
  const { handleSubmit } = useCustomMutation();
  const [options, setOptions] = useState<Option[]>([]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenSubCategory,
    onClose: onCloseSubCategory,
    onOpen: onOpenSubCategory,
  } = useDisclosure();

  const handleSearch = async () => {
    const searchCriterion = {
      criterion: [
        {
          columnName: 'categoryId',
          columnValue: selectedCategory?.toString(),
          operation: OPERATORS.Equals,
        },
      ],
      pageNumber,
      pageSize: 25,
    };
    const response = await handleSubmit(
      searchSubCategories,
      searchCriterion,
      ''
    );
    const formattedOptions = generateOptions(
      response?.data?.data.items,
      'subCategoryName',
      'subCategoryId'
    );
    setOptions((prev) => [...prev, ...formattedOptions]);
  };

  useEffect(() => {
    if (selectedCategory) {
      handleSearch();
    }
  }, [selectedCategory]);

  return (
    <>
      <HStack width="full" alignItems="flex-start" spacing="104px">
        <Flex width="full" maxW="118px">
          <SectionInfo
            title="Category"
            info="Choose the category and the sub-category"
            isRequired
          />
        </Flex>
        <Grid templateColumns="repeat(4, 1fr)" gap="11px" width="full">
          <GridItem colSpan={3}>
            <HStack spacing="11px" alignItems="flex-start">
              <VStack alignItems="flex-end" width="full">
                <CategorySelect
                  handleSelect={(option) => {
                    setSelectedCategory(option.value as number);
                  }}
                />
                <AddButton handleClick={onOpen}>Add New Category</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SelectInput
                  name="subCategoryId"
                  title="Sub Category"
                  options={options}
                  width="full"
                  isSearchable
                  isLoading={isLoading}
                  isAsync
                />
                <AddButton handleClick={onOpenSubCategory}>
                  Add New Subcategory
                </AddButton>
              </VStack>
            </HStack>
          </GridItem>
        </Grid>
      </HStack>
      <CategoryModal isOpen={isOpen} onClose={onClose} />
      <SubCategoryModal
        isOpen={isOpenSubCategory}
        onClose={onCloseSubCategory}
      />
    </>
  );
};

export default AssetCategory;
