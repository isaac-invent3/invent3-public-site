import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { Switch } from '@chakra-ui/react';

const TwoStepVerification = () => {
  return (
    <SectionWrapper
      title="2 Step Verification"
      subtitle="Make your account extra secure. Along with your password, you'll need to enter a code."
      sectionInfoWidth="212px"
      sectionInfoStyle={{ width: { base: '60%', md: '212px' } }}
    >
      <Switch size="sm" />
    </SectionWrapper>
  );
};

export default TwoStepVerification;
