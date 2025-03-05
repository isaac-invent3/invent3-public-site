import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { Button } from '@repo/ui/components';

const DeleteAccount = () => {
  return (
    <SectionWrapper
      title="Delete Account"
      subtitle="Permanently remove your account and all data"
      sectionInfoWidth="212px"
      sectionInfoStyle={{ width: { base: '60%', md: '212px' } }}
    >
      <Button
        variant="secondary"
        customStyles={{
          width: 'max-content',
          height: { base: '35px', md: '50px' },
          px: { md: '32px' },
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
