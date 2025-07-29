import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllDepartmentsQuery,
  useGetDepartmentsByFloorIdQuery,
  useSearchDepartmentsMutation,
} from '~/lib/redux/services/location/department.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';

interface DepartmentSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  floorId?: number | null;
  selectedOption?: Option | null;
}

const DepartmentSelect = (props: DepartmentSelectProps) => {
  const { handleSelect, type, floorId, selectedOption } = props;
  const { departmentName } = useAppSelector((state) => state.asset.assetForm);
  const [searchDepartment] = useSearchDepartmentsMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllDepartmentsQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const {
    data: departmentsByFloorIdData,
    isLoading: isLoadingDepartmentsByFloorIdData,
    isFetching: isFetchingDepartmentsByFloorIdData,
  } = useGetDepartmentsByFloorIdQuery(
    {
      id: floorId ?? undefined,
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
    },
    { skip: !floorId }
  );

  const departmentByFloorIdCriterion = (
    searchValue: string
  ): SearchCriterion[] => {
    const criterion = [
      {
        columnName: 'floorId',
        columnValue: floorId?.toString() as string,
        operation: OPERATORS.Equals,
      },
      {
        columnName: 'departmentName',
        columnValue: searchValue,
        operation: OPERATORS.Contains,
      },
    ];
    return criterion;
  };

  return (
    <GenericAsyncSelect
      selectName="departmentId"
      selectTitle="Department"
      data={type === 'general' ? data : floorId ? departmentsByFloorIdData : []}
      labelKey="departmentName"
      valueKey="departmentId"
      defaultInputValue={departmentName}
      mutationFn={searchDepartment}
      isLoading={
        isLoading ||
        isLoadingDepartmentsByFloorIdData ||
        isFetching ||
        isFetchingDepartmentsByFloorIdData
      }
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      fetchKey={floorId}
      specialSearch={
        type === 'specificById' ? departmentByFloorIdCriterion : undefined
      }
      selectedOption={selectedOption ?? undefined}
    />
  );
};

export default DepartmentSelect;
