import { FormInputWrapper } from '@repo/ui/components';
import React from 'react';
import FacilitySelect from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/FacilitySelect';

const Location = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="16px"
      description="Select Location to be associated"
      title="Location"
      isRequired
    >
      <FacilitySelect
        type="general"
        name="location"
        labelKey={[
          'facilityRef',
          'facilityName',
          'lganame',
          'stateName',
          'countryName',
        ]}
      />
    </FormInputWrapper>
  );
};

export default Location;
