import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import HeroHeader from '../Common/HeroHeader';
import SearchComponent from '../Common/SearchComponent';

const Hero = () => {
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');

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
        bgImage="/hero-bg.png"
        opacity={0.1}
      />
      <Flex
        width="full"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        py={{ base: '118px', lg: '72px' }}
        maxW="610px"
        position="relative"
        direction="column"
        gap="24px"
        justifyContent="center"
      >
        <HeroHeader
          title="Ask us anything"
          subtitle="Need something cleared up? Here are our most frequently asked questions."
          bgDesktop=""
        />
        <SearchComponent setSearch={setSearch} />
      </Flex>
    </Flex>
  );
};

export default Hero;
