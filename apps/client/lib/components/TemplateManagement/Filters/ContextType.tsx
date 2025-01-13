import React, { useEffect, useState } from 'react';
import { FilterDropDown } from '@repo/ui/components';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateTemplateFilter } from '~/lib/redux/slices/TemplateSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { useGetReportableSystemContextTypesQuery } from '~/lib/redux/services/systemcontexttypes.services';

const ContextTypeFilter = () => {
  const dispatch = useAppDispatch();
  const { contextTypeId } = useAppSelector(
    (state) => state.template.templateFilters
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [options, setOptions] = useState<Option[]>([]);
  const { data, isLoading } = useGetReportableSystemContextTypesQuery({
    pageNumber: pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    if (data?.data?.items) {
      const newCategories = generateOptions(
        data?.data?.items,
        'displayName',
        'systemContextTypeId'
      );
      setOptions((prev) => [...prev, ...newCategories]);
    }
  }, [data]);

  return (
    <FilterDropDown
      showBorder
      label="Context Type:"
      options={options}
      selectedOptions={contextTypeId.map((item) => ({
        value: item,
        label: item.toString(),
      }))}
      handleClick={(option) =>
        dispatch(
          updateTemplateFilter({
            contextTypeId: contextTypeId.includes(+option.value)
              ? contextTypeId
              : [...contextTypeId, +option.value],
          })
        )
      }
      hasMoreOptions={data?.data?.hasNextPage}
      loadMoreOptions={() => setPageNumber((prev) => prev + 1)}
      isLoading={isLoading}
    />
  );
};

export default ContextTypeFilter;
