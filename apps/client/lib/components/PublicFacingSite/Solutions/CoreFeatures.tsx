import { Flex, Image, SimpleGrid, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';
import TitleSubtitleCard from '../Common/TitleSubtitleCard';

const reasons = [
  {
    title: 'AI-Powered Asset Tracking',
    subtitle:
      'Gain real-time visibility into every asset, everywhere.With advanced AI and IoT integration, Invent3Pro tracks the location, condition, and usage of all assets in real time.',
  },
  {
    title: 'Predictive & Preventive Maintenance',
    subtitle:
      'Reduce unexpected failures and extend asset lifespan. Invent3Pro uses AI-driven predictive analytics to detect potential issues before they become costly problems.',
  },
  {
    title: 'Automated Compliance & Audit Readiness',
    subtitle:
      'Stay ahead of regulations with built-in compliance tracking.Avoid compliance risks with real-time audit logs, automated documentation, and instant regulatory alerts.',
  },
  {
    title: 'Smart Workflow Automation',
    subtitle:
      'Eliminate manual work and speed up approvals."From maintenance requests to asset approvals, Invent3Pro automates tedious workflows, reducing administrative overhead.',
  },
  {
    title: 'Advanced Reporting & Business Intelligence',
    subtitle:
      'Turn raw data into actionable insights." Invent3Pro provides custom dashboards and AI-powered analytics, helping you track performance, costs, and asset utilization.',
  },
  {
    title: 'Seamless Third-Party Integrations',
    subtitle:
      'Sync Invent3Pro with the tools you already use.Easily integrate with ERP, CRM, and financial platforms like SAP, Salesforce, QuickBooks, and more.',
  },
];
const CoreFeatures = () => {
  return (
    <Flex
      justifyContent="center"
      width="full"
      bgColor="#0E2642"
      position="relative"
    >
      <Image
        src="/solution-bg-desktop-1.svg"
        alt="solution-bg-desktop-1"
        position="absolute"
        top={{ base: 10, lg: 20 }}
        right={{ base: -30, lg: 0 }}
        display={{ base: 'none', lg: 'flex' }}
      />
      <Flex
        position="absolute"
        left={0}
        bottom={0}
        top={0}
        right={0}
        alignItems="center"
        display={{ base: 'none', lg: 'flex' }}
      >
        <Image src="/solution-bg-desktop-2.svg" alt="solution-bg-desktop-2" />
      </Flex>
      <Flex
        position="absolute"
        bottom={0}
        justifyContent="center"
        width="full"
        display={{ base: 'none', lg: 'flex' }}
      >
        <Image src="/solution-bg-desktop-3.svg" alt="solution-bg-desktop-3" />
      </Flex>
      <Flex
        position="absolute"
        // left={0}
        bottom={0}
        top={0}
        right={0}
        alignItems="center"
        display={{ base: 'flex', lg: 'none' }}
      >
        <Image src="/solution-bg-mobile-1.svg" alt="solution-bg-mobile-1" />
      </Flex>
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        pt={{ base: '65px', lg: '110px' }}
        pb="110px"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: '40px', lg: '56px' }}
        zIndex={9999}
      >
        <VStack
          width={{ base: '100%', lg: '42%' }}
          alignItems="flex-start"
          spacing={{ base: '40px', lg: '60px' }}
        >
          <SectionInfo
            badgeText="Our Core Features"
            heading={[
              'Powerful',
              ['Features'],
              'to Optimize Every Aspect of Asset & Facility Management',
            ]}
            headingPrimaryColor="white"
            descriptionStyles={{ color: 'neutral.300' }}
            description="Invent3Pro is built for efficiency, scalability, and intelligence. Our AI-powered platform automates asset tracking, streamlines maintenance, and ensures compliance—so you can focus on growth, not guesswork"
            containerStyles={{ spacing: '24px' }}
          />
          <Button
            customStyles={{
              bgColor: 'white',
              color: 'primary',
              width: { base: '175px' },
              _hover: {
                bgColor: 'white',
                color: 'primary',
              },
            }}
          >
            Get a Free Demo
          </Button>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          rowGap={{ base: '56px', lg: '70px' }}
          columnGap={{ base: '32px', lg: '37px' }}
          width={{ base: '100%', lg: '58%' }}
        >
          {reasons.map((item, index) => (
            <TitleSubtitleCard
              {...item}
              key={index}
              titleStyles={{
                color: 'white',
                fontSize: { base: '16px', lg: '20px' },
                lineHeight: { base: '24px', lg: '100%' },
              }}
              subtitleStyles={{
                color: 'neutral.300',
                fontSize: { base: '14px', lg: '16px' },
                lineHeight: { base: '24px', lg: '24px' },
              }}
              containerStyles={{ spacing: '24px' }}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default CoreFeatures;
