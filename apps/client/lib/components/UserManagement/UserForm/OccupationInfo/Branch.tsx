import { VStack } from '@chakra-ui/react';
import { ErrorMessage, FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import React from 'react';
import FacilitySelect from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/FacilitySelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';

const Branch = () => {
  const [field, meta, helpers] = useField('branchId'); //eslint-disable-line
  const { cityId, branchId, branchName } = useAppSelector(
    (state) => state.user.userForm
  );
  const dispatch = useAppDispatch();
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="81px"
      description="Select Branch"
      title="Branch"
    >
      <VStack width="full" spacing="4px">
        <FacilitySelect
          type="specificById"
          lgaId={cityId}
          name="branchId"
          defaultValue={branchName}
          handleSelect={(option) => {
            helpers.setValue(option.value);
            dispatch(updateUserForm({ branchName: option.label }));
          }}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default Branch;
