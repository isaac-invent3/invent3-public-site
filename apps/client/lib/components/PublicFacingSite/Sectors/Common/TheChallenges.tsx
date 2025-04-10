import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../../Common/SectionInfo';
import { Button } from '@repo/ui/components';
import TitleSubtitleCard from '../../Common/TitleSubtitleCard';

interface TheChallengesProps {
  items: { title: string; subtitle: string }[];
  sectionDescription: string;
}
const TheChallenges = (props: TheChallengesProps) => {
  const { items, sectionDescription } = props;
  return (
    <Flex
      justifyContent="center"
      width="full"
      mt={{ base: '80px', lg: '120px' }}
      background="linear-gradient(180deg, rgba(255, 211, 97, 0) 0%, rgba(255, 211, 97, 0.1) 100%)"
    >
      <SimpleGrid
        width="full"
        alignItems="flex-start"
        py={{ base: '27px', lg: '37px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        columns={{ base: 1, lg: 2 }}
        gap={{ base: '24px', lg: '80px', xl: '159px' }}
      >
        <VStack spacing={{ base: '32px', lg: '55px' }} alignItems="flex-start">
          <SectionInfo
            badgeText="Challenges"
            heading={['Industry', ['Challenges']]}
            headingStyles={{ width: 'full' }}
            description={sectionDescription}
          />
          <Button customStyles={{ width: '175px' }}>Get a Free Demo</Button>
        </VStack>
        <SimpleGrid
          width="full"
          columns={{ base: 1, lg: 2 }}
          columnGap="48px"
          rowGap="40px"
        >
          {items.map((item) => (
            <TitleSubtitleCard
              {...item}
              containerStyles={{ spacing: { base: '24px' } }}
              titleStyles={{ fontSize: { lg: '20px' } }}
              subtitleStyles={{ color: 'primary.accent', fontSize: '14px' }}
            />
          ))}
        </SimpleGrid>
      </SimpleGrid>
    </Flex>
  );
};

export default TheChallenges;
