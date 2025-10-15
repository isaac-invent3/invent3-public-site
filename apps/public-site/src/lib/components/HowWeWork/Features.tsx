import React from 'react';
import CheckIconKeyPoints from '../Common/CheckIconKeyPoints';
import { Flex, Icon, SimpleGrid, VStack } from '@chakra-ui/react';
import { SlantedForwardIcon } from '@/lib/components/CustomIcons';
import SectionInfo from '../Common/SectionInfo';
import Image from 'next/image';

const contents = [
  {
    title: [
      ['AI-Driven'],
      'Data-Powered,  Smarter Decisions. Better Outcomes.',
    ],
    description:
      "Our platform doesn't just digitize your operations—it enhances them. By leveraging AI and machine learning, we transform raw data into predictive insights, allowing you to stay ahead of risks, reduce downtime, and drive smarter investments.",
    image: '/how-we-work-ai-driven.svg',
  },
  {
    title: [
      'Designed for Seamless Adoption. Easy',
      ['Integration'],
      ', Fast ROI.',
    ],
    description:
      "Invent3Pro is built for rapid implementation. With minimal disruption and easy integrations, your teams can start seeing value immediately—whether it's reducing operational costs, streamlining asset tracking, or improving service delivery.",
    image: '/how-we-work-integration.svg',
  },
];

interface FeatureItemProps {
  title: (string | string[])[];
  description: string;
  image: string;
}

const FeatureItem = (props: FeatureItemProps) => {
  const { title, description, image } = props;
  return (
    <VStack
      width="full"
      background="linear-gradient(180deg, #EBEBEB 0%, rgba(235, 235, 235, 0) 65.78%)"
      rounded="16px"
      padding="24px"
      spacing={{ base: '40px', lg: '104px' }}
    >
      <VStack alignItems="flex-start" spacing="24px" width="full">
        <Flex
          alignItems="center"
          justifyContent="center"
          width="86px"
          height="86px"
          rounded="full"
          bgColor="secondary.purple.500"
        >
          <Icon as={SlantedForwardIcon} boxSize="50px" color="black" />
        </Flex>
        <SectionInfo
          heading={title}
          description={description}
          containerStyles={{
            spacing: '24px',
            maxW: '477px',
          }}
        />
      </VStack>
      <Flex position="relative" width="full" height="full" minH="410px">
        <Image src={image} alt="section-image" fill />
      </Flex>
    </VStack>
  );
};

const OurProcess = () => {
  return (
    <SimpleGrid width="full" columns={{ base: 1, md: 2 }} spacing="40px">
      {contents.map((item, index) => (
        <FeatureItem {...item} key={index} />
      ))}
    </SimpleGrid>
  );
};

export default OurProcess;
