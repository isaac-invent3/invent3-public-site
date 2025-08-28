import { Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import GenericFeatures from '../../Common/GenericFeatures';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featureItems = [
  {
    tabIndex: 0,
    tabName: 'AI-Powered Asset Tracking',
    title: 'AI-Powered Asset Tracking',
    description:
      'Know where your assets are and how they’re performing at all times. Gain real-time visibility into asset locations, usage, and status across multiple sites.',
    image: '/asset-tracking-illustration.png',
  },
  {
    tabIndex: 1,
    tabName: 'Compliance & Audit Readiness',
    title: 'Compliance & Audit Readiness',
    description:
      'Stay ahead of regulatory requirements with real-time monitoring. Ensure seamless audits with automated compliance tracking, document storage, and violation alerts.',
    image: '/complaince-readiness.jpg',
  },
  {
    tabIndex: 2,
    tabName: 'Predictive Maintenance',
    title: 'Predictive Maintenance',
    description:
      'Prevent costly breakdowns with automated servicing alerts. Reduce unexpected failures with data-driven maintenance scheduling that keeps assets running longer.',
    image: '/predictive-maintenance.jpg',
  },
  {
    tabIndex: 3,
    tabName: 'Smart Workflow Automation',
    title: 'Smart Workflow Automation',
    description:
      'Eliminate manual work and speed up asset approvals and maintenance requests. Streamline task assignments, approval flows, and vendor coordination to enhance operational efficiency.',
    image: '/smart-workflow-automation.svg',
  },
  {
    tabIndex: 4,
    tabName: 'Seamless Third-Party Integrations',
    title: 'Seamless Third-Party Integrations',
    description:
      'Connect effortlessly with ERP, CRM, and financial tools. Sync data across your existing enterprise systems, reducing redundancy and improving accuracy.',
    image: '/seamless-third-party-integrations.jpg',
  },
  {
    tabIndex: 5,
    tabName: 'Data-Driven Insights',
    title: 'Data-Driven Insights',
    description:
      'Make smarter decisions with detailed reports and analytics. Track asset utilization, maintenance costs, and performance trends to drive better business strategies.',
    image: '/data-driven-insights.svg',
  },
];
const Features = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentOneRef = useRef<HTMLDivElement | null>(null);
  const contentTwoRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const contentOneElement = contentOneRef.current;
    const contentTwoElement = contentTwoRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionElement,
        toggleActions: 'restart none none none',
        start: 'top 50%',
        end: 'bottom 100%',
        scrub: 1,
      },
    });

    tl.from(contentOneElement, { opacity: 0, x: -100, duration: 0.5 });
    tl.to(contentOneElement, { opacity: 1, x: 0, duration: 0.5 });

    tl.from(contentTwoElement, { opacity: 0, x: 100, duration: 0.5 });
    tl.to(contentTwoElement, { opacity: 1, x: 0, duration: 0.5 });
  }, []);

  return (
    <Flex
      justifyContent="center"
      width="full"
      bgColor="primary.500"
      ref={containerRef}
    >
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        pt={{ base: '56px', lg: '142px' }}
        pb={{ base: '109px', lg: '118.5px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap={{ base: '64px', lg: '80px' }}
        ref={sectionRef}
      >
        <VStack
          width="full"
          spacing={{ base: '24px', lg: '32px' }}
          alignItems="flex-start"
        >
          <Text
            color="primary.500"
            px="16px"
            py="12px"
            rounded="full"
            bgColor="neutral.250"
          >
            Product Features
          </Text>
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            width="full"
            spacing={{ base: '32px', lg: '64px' }}
            alignItems="flex-start"
          >
            <Heading
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
              color="white"
              maxW="862px"
              textAlign="left"
              ref={contentOneRef}
            >
              Powerful Features to Simplify your{' '}
              <Heading
                as="span"
                color="#B279A2"
                fontWeight={800}
                fontSize={{ base: '24px', md: '40px' }}
                lineHeight={{ base: '28.51px', md: '47.52px' }}
              >
                Facility Management
              </Heading>
            </Heading>
            <Text
              fontSize={{ base: '14px', md: '16px' }}
              lineHeight={{ base: '20px', md: '24px' }}
              color="#6E7D8E"
              fontWeight={400}
              maxW="538px"
              textAlign="left"
              ref={contentTwoRef}
            >
              Designed for efficiency, built for reliability. InventPro offers
              AI-driven automation, real-time tracking, and seamless
              integrations to help businesses manage their assets smarter and
              faster
            </Text>
          </Stack>
        </VStack>
        <GenericFeatures
          featureItems={featureItems}
          buttonLink="/waitlist"
          buttonText="Join Waitlist"
          containerRef={containerRef}
        />
      </Flex>
    </Flex>
  );
};

export default Features;
