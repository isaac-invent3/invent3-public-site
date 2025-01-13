import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { Button } from '@repo/ui/components';

const DeleteAccount = () => {
  return (
    <SectionWrapper
      title="Delete Account"
      subtitle="Permanently remove your account and all data"
      sectionInfoWidth="212px"
    >
      <Button
        variant="secondary"
        customStyles={{
          width: 'max-content',
          px: '32px',
          bgColor: '#F500001A',
          color: '#F50000',
        }}
      >
        Delete
      </Button>
    </SectionWrapper>
  );
};

export default DeleteAccount;
