import { Flex } from '@chakra-ui/react';
import React from 'react';
import HeroHeader from '../Common/HeroHeader';

const Hero = () => {
  return (
    <Flex
      justifyContent="center"
      width="full"
      bgColor="primary.500"
      position="relative"
      direction="column"
      alignItems="center"
    >
      <Flex
        width="full"
        height="full"
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        bgImage="/contact-bg-1.png"
        bgRepeat="no-repeat"
        bgPosition="bottom left"
        opacity={0.15}
      />
      <Flex
        width="full"
        height="full"
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        bgImage="/contact-bg-2.png"
        bgRepeat="no-repeat"
        bgPosition="bottom right"
        opacity={0.2}
      />
      <Flex
        width="full"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        py={{ base: '118px', lg: '72px' }}
        position="relative"
        direction="column"
      >
        <HeroHeader
          title="Contact Us"
          subtitle="Our friendly customer support team is ready to assist you with any inquiries you might have. Whether it's about using our services, troubleshooting issues, or providing feedback, we're just a message away.
"
        />
      </Flex>
    </Flex>
  );
};

export default Hero;
