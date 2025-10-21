import { useDisclosure, VStack } from '@chakra-ui/react';
import {
  ErrorMessage,
  FormAddButton,
  FormInputWrapper,
} from '@repo/ui/components';
import { useField } from 'formik';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllDesignationsQuery,
  useSearchDesignationMutation,
} from '~/lib/redux/services/designation.services';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import JobDesignationModal from '../../Modals/JobDesignationModal';

const JobTitle = () => {
  const [field, meta, helpers] = useField('jobTitleId'); //eslint-disable-line
  const dispatch = useAppDispatch();
  const { jobTitleName } = useAppSelector((state) => state.user.userForm);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchDesignation] = useSearchDesignationMutation({});
  const { data, isLoading, isFetching } = useGetAllDesignationsQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <FormInputWrapper
        sectionMaxWidth="141px"
        customSpacing="36px"
        description="Select Job Role"
        title="Job Role"
      >
        <VStack width="full" spacing="4px" alignItems="flex-end">
          <GenericAsyncSelect
            selectName="jobTitleId"
            selectTitle="Job Role"
            data={data}
            labelKey="designationName"
            valueKey="designationId"
            defaultInputValue={jobTitleName}
            mutationFn={searchDesignation}
            isLoading={isLoading || isFetching}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            handleSelect={(option) => {
              helpers.setValue(option?.value);
              dispatch(updateUserForm({ jobTitleName: option?.label }));
            }}
            fetchKey={1}
          />
          <FormAddButton handleClick={onOpen}>Add New Role</FormAddButton>
          {meta.touched && meta.error !== undefined && (
            <ErrorMessage>{meta.error}</ErrorMessage>
          )}
        </VStack>
      </FormInputWrapper>
      <JobDesignationModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default JobTitle;
