import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllAssetCategoryQuery,
  useSearchCategoriesMutation,
} from '~/lib/redux/services/asset/category.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface CategorySelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  name?: string;
}

const CategorySelect = (props: CategorySelectProps) => {
  const { handleSelect, name } = props;
  const { categoryName } = useAppSelector((state) => state.asset.assetForm);
  const [searchCategory] = useSearchCategoriesMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAssetCategoryQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName={name ?? 'categoryId'}
      selectTitle="Category"
      data={data}
      labelKey="categoryName"
      valueKey="categoryId"
      defaultInputValue={categoryName}
      mutationFn={searchCategory}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default CategorySelect;
