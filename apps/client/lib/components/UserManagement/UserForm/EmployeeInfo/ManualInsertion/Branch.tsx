import { VStack } from '@chakra-ui/react';
import { ErrorMessage, FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import React from 'react';
import FacilitySelect from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/FacilitySelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';

const Branch = () => {
  const [field, meta, helpers] = useField('branchId'); //eslint-disable-line
  const { cityId, branchName } = useAppSelector((state) => state.user.userForm);
  const dispatch = useAppDispatch();
  return (
    <FormInputWrapper
      sectionMaxWidth="157px"
      customSpacing="65px"
      description="Select Facility associated with the user"
      title="Facilty"
      isRequired
    >
      <FacilitySelect
        type="general"
        lgaId={cityId}
        name="branchId"
        labelKey={[
          'facilityRef',
          'facilityName',
          'lganame',
          'stateName',
          'countryName',
        ]}
        defaultValue={branchName}
        handleSelect={(option) => {
          helpers.setValue(option?.value);
          dispatch(updateUserForm({ branchName: option?.label }));
        }}
      />
    </FormInputWrapper>
  );
};

export default Branch;
