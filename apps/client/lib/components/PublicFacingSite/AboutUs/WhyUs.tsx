import { Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import GenericFeatures from '../Common/GenericFeatures';

const featureItems = [
  {
    tabIndex: 0,
    tabName: 'To Be Strategic',
    title: 'To Be Strategic',
    description:
      'Make informed decisions with AI-driven insights. Forecast trends, optimize asset performance, and prevent disruptions before they happen.',
    image: '/strategy-1.png',
  },
  {
    tabIndex: 1,
    tabName: 'To Increase Profitability',
    title: 'To Increase Profitability',
    description:
      'Maximize asset value and cut unnecessary costs. Reduce downtime, eliminate inefficiencies, and extend asset lifespan for long-term savings.',
    image: '/strategy-1.png',
  },
  {
    tabIndex: 2,
    tabName: 'To Maximize Productivity',
    title: 'To Maximize Productivity',
    description:
      'Automate workflows and keep your teams focused on what matters. Streamline operations with intelligent task management and predictive maintenance scheduling.',
    image: '/strategy-1.png',
  },
  {
    tabIndex: 3,
    tabName: 'To Get Better Insights',
    title: 'To Get Better Insights',
    description:
      'Turn complex asset data into actionable intelligence. Leverage real-time analytics to identify risks, improve efficiency, and drive growth.',
    image: '/strategy-1.png',
  },
  {
    tabIndex: 4,
    tabName: 'To Improve Efficiency',
    title: 'To Improve Efficiency',
    description:
      'Reduce bottlenecks and increase operational agility. Automate compliance tracking, maintenance planning, and asset workflows.',
    image: '/strategy-1.png',
  },
  {
    tabIndex: 5,
    tabName: 'To Keep Connected',
    title: 'To Keep Connected',
    description:
      'Seamlessly integrate with your existing business ecosystem. Connect effortlessly with ERP, CRM, and financial tools for a unified workflow.',
    image: '/strategy-1.png',
  },
];
const WhyUs = () => {
  return (
    <Flex
      justifyContent="center"
      width="full"
      background="linear-gradient(180deg, rgba(255, 211, 97, 0.2) -40.24%, rgba(255, 211, 97, 0) 100%)"
      position="relative"
    >
      <Image
        src="/why-us-1.svg"
        alt="bg-vector-1"
        position="absolute"
        top={{ base: 10, lg: 20 }}
        right={{ base: -30, lg: 5 }}
        display={{ base: 'none', md: 'flex' }}
      />
      <Image
        src="/why-us-2.svg"
        alt="bg-vector-2"
        position="absolute"
        left={-10}
        bottom={0}
        display={{ base: 'none', md: 'flex' }}
      />
      <Image
        src="/why-us-3.svg"
        alt="bg-vector-3"
        position="absolute"
        bottom={60}
        right={{ base: -2, lg: -1 }}
        display={{ base: 'none', md: 'flex' }}
      />
      {/* //Mobile */}
      <Image
        src="/why-vector-mobile-1.svg"
        alt="bg-vector-1"
        position="absolute"
        top={{ base: 10, lg: 20 }}
        right={{ base: -30, lg: 5 }}
        display={{ base: 'flex', md: 'none' }}
      />
      <Image
        src="/why-vector-mobile-2.svg"
        alt="bg-vector-2"
        position="absolute"
        left={0}
        bottom={0}
        display={{ base: 'flex', md: 'none' }}
      />
      <Image
        src="/why-vector-mobile-3.svg"
        alt="bg-vector-3"
        position="absolute"
        bottom={60}
        right={{ base: -2, lg: -1 }}
        display={{ base: 'flex', md: 'none' }}
      />
      {/* //Mobile */}
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        pt={{ base: '79px', lg: '46px' }}
        pb={{ base: '40px', lg: '79px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap={{ base: '32px', lg: '63px' }}
      >
        <VStack width="full" spacing={{ base: '8px', lg: '24px' }}>
          <Heading
            fontWeight={800}
            fontSize={{ base: '28px', md: '40px' }}
            lineHeight="100%"
            color="black"
            maxW="556px"
            textAlign="center"
          >
            Why Leading Businesses Trust{' '}
            <Heading
              as="span"
              color="#B279A2"
              fontWeight={800}
              fontSize={{ base: '28px', md: '40px' }}
              lineHeight="100%"
            >
              Invent3.ai
            </Heading>
          </Heading>
          <Text
            fontSize={{ base: '14px', md: '16px' }}
            lineHeight={{ base: '20px', md: '24px' }}
            color="#515151"
            fontWeight={400}
            maxW="656px"
            textAlign="center"
          >
            Invent3.ai isn’t just another asset management provider—we are a
            trusted partner in digital transformation. Our AI-powered solutions
            help businesses optimize performance, reduce costs, and stay ahead
            of the competition.
          </Text>
        </VStack>
        <GenericFeatures
          featureItems={featureItems}
          buttonLink=""
          buttonText="Learn More About Our Team"
          containerStyles={{ bgColor: { base: 'none', lg: '#F9E7B3' } }}
          tabColor="neutral.600"
          featureDescriptionColor="neutral.700"
        />
      </Flex>
    </Flex>
  );
};

export default WhyUs;
