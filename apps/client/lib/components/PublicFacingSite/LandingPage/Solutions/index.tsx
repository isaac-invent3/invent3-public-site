import { Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import SolutionCard from './SolutionCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allSolutions = [
  {
    title: 'Banking and Finance',
    description:
      'Ensure seamless operations by tracking IT infrastructure, data centres and security systems. ensuring compliance with financial regulations.',
    icon: '/solution-banking-finance.png',
  },
  {
    title: 'Transportation & Public Infrastructure',
    description:
      'Optimize asset performance across transportation networks and facilities  maintenance with real-time insights.',
    icon: '/solution-transportation.png',
  },
  {
    title: 'Healthcare & Medical Facilities',
    description:
      'Ensure critical equipment is always operational, track hospital assets and maintain regulatory compliance effortlessly.',
    icon: '/solution-healthcare.png',
  },
  {
    title: 'Industrial and Manufacturing',
    description:
      'Reduce downtime and optimize production with predictive maintenance and automated servicing alerts.',
    icon: '/solution-industry.png',
  },
  {
    title: 'Retail & Warehousing',
    description:
      'Optimize warehouse assets, track POS systems, and schedule facility repairs with ease.',
    icon: '/solution-retail.png',
  },
  {
    title: 'Real Estate &Facilities Management',
    description:
      'Streamline building maintenance, manage HVAC systems, and track tenant service requests proactively.',
    icon: '/solution-realestate.png',
  },
  {
    title: 'Logistics & Fleet Management',
    description:
      'Maximize asset uptime, monitor vehicle conditions, optimize routes, and schedule timely maintenance to reduce disruptions',
    icon: '/solution-logistics.png',
  },
  {
    title: 'Corporate & Office Spaces',
    description:
      'Keep workspaces efficient, manage office equipment, IT infrastructure, and facilities with AI-powered automation.',
    icon: '/solution-corporate.png',
  },
];

const Solutions = () => {
  const solutionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const solutionsElement = solutionsRef.current;
    const sectionElement = sectionRef.current;
    const headerElement = headerRef.current;

    // const mm = gsap.matchMedia();

    // mm.add('(min-width: 1024px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionElement,
        toggleActions: 'restart none none none',
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1,
      },
    });
    tl.from(headerElement, { opacity: 0, x: -100, duration: 0.5 });
    tl.to(headerElement, { opacity: 1, x: 0, duration: 0.5 });
    solutionsElement.forEach((feature, index) => {
      tl.from(feature, { opacity: 0, y: 100, duration: 0.5 }, index * 0.3);
      tl.to(feature, { opacity: 1, y: 0, duration: 0.5 });
    });
    // });
  }, []);

  return (
    <Flex justifyContent="center" width="full" ref={sectionRef}>
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        pt={{ base: '80px', lg: '145px' }}
        pb={{ base: '40px', lg: '145px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap={{ base: '112px', lg: '60px' }}
      >
        <VStack width="full" spacing="24px" ref={headerRef}>
          <Text
            py="12px"
            px="16px"
            color="primary.500"
            bgColor="neutral.250"
            rounded="full"
          >
            Solution for Industries
          </Text>
          <Heading
            fontWeight={800}
            fontSize={{ base: '24px', md: '40px' }}
            lineHeight={{ base: '28.51px', md: '47.52px' }}
            color="black"
            maxW="537px"
            textAlign="center"
          >
            Tailored{' '}
            <Heading
              as="span"
              color="#B279A2"
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
            >
              CAFM Solutions{' '}
            </Heading>
            for Every Industry
          </Heading>
          <Text
            fontSize={{ base: '14px', md: '16px' }}
            lineHeight={{ base: '20px', md: '24px' }}
            color="#515151"
            fontWeight={400}
            maxW="648px"
            textAlign="center"
          >
            From manufacturing to healthcare, Invent3Pro adapts to your
            industry's unique needs. Our AI-driven platform ensures maximum
            efficiency, compliance, and cost savings—no matter your field.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="24px">
          {allSolutions.map((solution, index) => (
            <SolutionCard
              key={index}
              {...solution}
              index={index}
              solutionRef={solutionsRef}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Solutions;
