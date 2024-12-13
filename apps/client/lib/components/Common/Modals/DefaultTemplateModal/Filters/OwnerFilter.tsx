import React, { useEffect, useState } from 'react';
import { FilterDropDown } from '@repo/ui/components';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAllEmployeesQuery } from '~/lib/redux/services/employees.services';
import { updateTemplateFilter } from '~/lib/redux/slices/MaintenanceSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

const OwnerFilter = () => {
  const dispatch = useAppDispatch();
  const { owner } = useAppSelector(
    (state) => state.maintenance.templateFilters
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [options, setOptions] = useState<Option[]>([]);
  const { data, isLoading } = useGetAllEmployeesQuery({
    pageNumber: pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    if (data?.data?.items) {
      const newCategories = generateOptions(
        data?.data?.items,
        'employeeName',
        'employeeId'
      );
      setOptions((prev) => [...prev, ...newCategories]);
    }
  }, [data]);

  return (
    <FilterDropDown
      showBorder
      label="Owner:"
      options={options}
      selectedOptions={[]}
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
      isLoading={isLoading}
    />
  );
};

export default OwnerFilter;
