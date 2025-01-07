import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { Button } from '@repo/ui/components';

const Password = () => {
  return (
    <SectionWrapper
      title="Password Address"
      subtitle="Set a unique password to protect your account."
      sectionInfoWidth="212px"
    >
      <Button variant="secondary" customStyles={{ width: 'max-content' }}>
        Change Password
      </Button>
    </SectionWrapper>
  );
};

export default Password;
