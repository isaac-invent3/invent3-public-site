import { FormInputWrapper } from '@repo/ui/components';
import React from 'react';
import FormImageUpload from '~/lib/components/Common/Form/FormImageUpload';

const Logo = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="133px"
      spacing="17px"
      description="Size max: 10MB each Format: JPG, PNG"
      title="Logo"
      isRequired
    >
      <FormImageUpload name="logo" actionText="Upload Logo" />
    </FormInputWrapper>
  );
};

export default Logo;
