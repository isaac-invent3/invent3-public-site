import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllAssetCategoryQuery,
  useSearchCategoriesMutation,
} from '~/lib/redux/services/asset/category.services';

interface CategorySelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const CategorySelect = (props: CategorySelectProps) => {
  const { handleSelect } = props;
  const [searchCategory] = useSearchCategoriesMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAssetCategoryQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName="categoryId"
      selectTitle="Category"
      data={data}
      labelKey="categoryName"
      valueKey="categoryId"
      mutationFn={searchCategory}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default CategorySelect;
