import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { Button } from '@repo/ui/components';

const DeactivateAccount = () => {
  return (
    <SectionWrapper
      title="Deactivate My Account"
      subtitle="Temporarily suspend your account without deleting it"
      sectionInfoWidth="212px"
      sectionInfoStyle={{ width: { base: '60%', md: '212px' } }}
    >
      <Button
        variant="secondary"
        customStyles={{
          width: 'max-content',
          height: { base: '35px', md: '50px' },
        }}
      >
        Deactivate
      </Button>
    </SectionWrapper>
  );
};

export default DeactivateAccount;
