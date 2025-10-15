import { Button, Flex, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';
import Image from 'next/image';

const ContinuousImprovement = () => {
  return (
    <Flex justifyContent="center" width="full" bgColor="primary.500">
      <SimpleGrid
        width="full"
        columns={{ base: 1, lg: 2 }}
        alignItems="center"
        py={{ base: '27px', lg: '34px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
      >
        <SectionInfo
          heading={[['Continuous'], 'Improvement - Evolving with Your Needs']}
          description="Your business is dynamic, and so is Invent3Pro. With ongoing updates, new AI models, and data-driven refinements, we ensure that our platform evolves alongside your organization’s changing demands."
          containerStyles={{
            spacing: '32px',
          }}
          headingPrimaryColor="white"
          headingStyles={{ maxW: '628px' }}
          descriptionStyles={{ color: 'white', maxW: '572px' }}
        />
        <Flex width="full" height="full" position="relative" minH="387px">
          <Image src="/business-man.png" alt="business-man" fill />
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

export default ContinuousImprovement;
