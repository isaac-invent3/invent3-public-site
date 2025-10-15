'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import Actions from './Actions';
import GetInTouch from './GetInTouch';
import HeroHeader from '../Common/HeroHeader';

const ContactUs = () => {
  return (
    <Flex direction="column" mb={{ lg: '82px' }}>
      <HeroHeader
        title="Contact Us"
        subtitle="Our friendly customer support team is ready to assist you, we're just a message away."
        customHeading={{ maxW: '617px' }}
        containerStyle={{ spacing: { base: '16px', lg: '24px' } }}
        subTitleStyle={{ maxW: { lg: '389px' } }}
        bgDesktop="/contact-hero-desktop.png"
        bgMobile="/contact-hero-mobile.png"
      />
      <Actions />
      <GetInTouch />
    </Flex>
  );
};

export default ContactUs;
