import React, { useEffect, useState } from 'react';
import { FilterDropDown } from '@repo/ui/components';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateTemplateFilter } from '~/lib/redux/slices/TemplateSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { useGetAllUsersQuery } from '~/lib/redux/services/user.services';

const OwnerFilter = () => {
  const dispatch = useAppDispatch();
  const { owner } = useAppSelector((state) => state.template.templateFilters);
  const [pageNumber, setPageNumber] = useState(1);
  const [options, setOptions] = useState<Option[]>([]);
  const { data, isLoading, isFetching } = useGetAllUsersQuery({
    pageNumber: pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    if (data?.data?.items) {
      const newCategories = generateOptions(
        data?.data?.items,
        'username',
        'userId'
      );
      setOptions((prev) => [...prev, ...newCategories]);
    }
  }, [data]);

  return (
    <FilterDropDown
      showBorder
      label="Owner:"
      options={options}
      selectedOptions={owner.map((item) => ({
        value: item,
        label: item.toString(),
      }))}
      handleClick={(option) =>
        dispatch(
          updateTemplateFilter({
            owner: owner.includes(+option.value)
              ? owner
              : [...owner, +option.value],
          })
        )
      }
      hasMoreOptions={data?.data?.hasNextPage}
      loadMoreOptions={() => setPageNumber((prev) => prev + 1)}
      isLoading={isLoading || isFetching}
    />
  );
};

export default OwnerFilter;
