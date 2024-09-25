import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import {
  useGetAssetSubCatgoriesByCategoryIdQuery,
  useSearchSubCategoryMutation,
} from '~/lib/redux/services/asset/category.services';
import { OPERATORS } from '~/lib/utils/constants';

interface SubCategorySelectProps {
  categoryId: number | null;
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const SubCategorySelect = (props: SubCategorySelectProps) => {
  const { categoryId, handleSelect } = props;
  const [searchCategory] = useSearchSubCategoryMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } =
    useGetAssetSubCatgoriesByCategoryIdQuery(
      {
        id: categoryId,
        pageSize: 25,
        pageNumber,
      },
      { skip: !categoryId }
    );

  const subCategorySearchCriterion = (
    searchValue: string
  ): SearchCriterion[] => {
    const criterion = [
      {
        columnName: 'categoryId',
        columnValue: categoryId?.toString() as string,
        operation: OPERATORS.Equals,
      },
      {
        columnName: 'subCategoryName',
        columnValue: searchValue,
        operation: OPERATORS.Contains,
      },
    ];
    return criterion;
  };

  return (
    <GenericAsyncSelect
      selectName="subCategoryId"
      selectTitle="Sub Category"
      data={isFetching ? [] : data}
      labelKey="subCategoryName"
      valueKey="subCategoryId"
      mutationFn={searchCategory}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      specialSearch={subCategorySearchCriterion}
      fetchKey={categoryId}
      handleSelect={handleSelect}
    />
  );
};

export default SubCategorySelect;
