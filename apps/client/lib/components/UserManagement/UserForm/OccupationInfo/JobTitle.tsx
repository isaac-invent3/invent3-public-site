import { VStack } from '@chakra-ui/react';
import { ErrorMessage, FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllDesignationsQuery,
  useSearchDesignationMutation,
} from '~/lib/redux/services/user.services';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const JobTitle = () => {
  const [field, meta, helpers] = useField('jobTitleId'); //eslint-disable-line
  const dispatch = useAppDispatch();
  const { countryName } = useAppSelector((state) => state.asset.assetForm);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchDesignation] = useSearchDesignationMutation({});
  const { data, isLoading } = useGetAllDesignationsQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });

  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="81px"
      description="Select Job Title"
      title="Job Title"
    >
      <VStack width="full" spacing="4px">
        <GenericAsyncSelect
          selectName="jobTitleId"
          selectTitle="Job Title"
          data={data}
          labelKey="designationName"
          valueKey="designationId"
          defaultInputValue={countryName}
          mutationFn={searchDesignation}
          isLoading={isLoading}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          handleSelect={(option) => {
            helpers.setValue(option.value);
            dispatch(updateUserForm({ jobTitleName: option.label }));
          }}
        />

        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default JobTitle;
