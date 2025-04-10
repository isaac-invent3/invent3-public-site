import {
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    title: 'To Be Strategic',
    description:
      'Gain a competitive edge by leveraging AI to forecast trends, prevent disruptions, and optimize asset performance.',
  },
  {
    title: 'To Increase Profitability',
    description:
      'Extend asset lifespan, cut operational expenses, and eliminate unnecessary downtime for better financial outcomes.',
  },
  {
    title: 'To Maximize Productivity',
    description:
      'Gain a competitive edge by leveraging AI to forecast trends, prevent disruptions, and optimize asset performance.',
  },
  {
    title: 'To Get Better Insights',
    description:
      'Gain a competitive edge by leveraging AI to forecast trends, prevent disruptions, and optimize asset performance.',
  },
  {
    title: 'To Improve Efficiency',
    description:
      'Gain a competitive edge by leveraging AI to forecast trends, prevent disruptions, and optimize asset performance.',
  },
  {
    title: 'To Keep Connected',
    description:
      'Gain a competitive edge by leveraging AI to forecast trends, prevent disruptions, and optimize asset performance.',
  },
];
const WhyUs = () => {
  const reasonsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reasonsElement = reasonsRef.current;
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
    reasonsElement.forEach((feature, index) => {
      tl.from(feature, { opacity: 0, y: 100, duration: 0.5 }, index * 0.3);
      tl.to(feature, { opacity: 1, y: 0, duration: 0.5 });
    });
    // });
  }, []);

  return (
    <Flex
      justifyContent="center"
      width="full"
      background="linear-gradient(180deg, rgba(255, 211, 97, 0.2) -31.16%, rgba(255, 211, 97, 0) 79.48%)"
      position="relative"
      ref={sectionRef}
    >
      <Image
        src="/why-us-1.svg"
        alt="bg-vector-1"
        position="absolute"
        top={{ base: 10, lg: 20 }}
        right={{ base: -30, lg: 5 }}
      />
      <Flex
        position="absolute"
        left={0}
        bottom={0}
        top={0}
        right={0}
        alignItems="center"
      >
        <Image src="/why-us-2.svg" alt="bg-vector-2" />
      </Flex>
      <Image
        src="/why-us-3.svg"
        alt="bg-vector-3"
        position="absolute"
        bottom={60}
        right={{ base: -2, lg: -1 }}
      />
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="center"
        pt={{ base: '65px', lg: '181px' }}
        pb="110px"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap={{ base: '78px', lg: '88px' }}
        zIndex={9999}
      >
        <VStack
          width="full"
          spacing="32px"
          alignItems="flex-start"
          ref={headerRef}
        >
          <Text
            py="12px"
            px="16px"
            color="primary.500"
            bgColor="neutral.250"
            rounded="full"
          >
            Why Invent3.ai
          </Text>
          <Heading
            fontWeight={800}
            fontSize={{ base: '24px', md: '40px' }}
            lineHeight={{ base: '28.51px', md: '47.52px' }}
            color="black"
            maxW="537px"
          >
            Be excellent with the right{' '}
            <Heading
              as="span"
              color="#B279A2"
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
            >
              CAFM Solutions
            </Heading>
          </Heading>
          <Text
            fontSize={{ base: '14px', md: '16px' }}
            lineHeight={{ base: '20px', md: '24px' }}
            color="primary.accent"
            fontWeight={400}
            maxW="578px"
          >
            Invent3.ai is more than a technology provider—we are a trusted
            partner in CAFM Industry with excellence. Our AI-driven solutions
            help businesses optimize asset management, enhance efficiency, and
            ensure long-term sustainability.
          </Text>
        </VStack>
        <VStack
          width="full"
          alignItems="flex-start"
          spacing={{ base: '80px', lg: '132px' }}
        >
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3 }}
            rowGap={{ base: '32px', lg: '74px' }}
            columnGap={{ base: '32px', lg: '42px' }}
          >
            {reasons.map((item, index) => (
              <VStack
                key={index}
                spacing={{ base: '16px', lg: '24px' }}
                alignItems="flex-start"
                ref={(el) => {
                  reasonsRef.current[index] = el;
                }}
              >
                <Heading
                  fontWeight={800}
                  fontSize={{ base: '16px', md: '20px' }}
                  lineHeight="100%"
                  color="black"
                >
                  {item.title}
                </Heading>
                <Text
                  fontSize={{ base: '14px', md: '16px' }}
                  lineHeight={{ base: '20px', md: '24px' }}
                  color="#515151"
                  fontWeight={400}
                >
                  {item.description}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
          <Button
            customStyles={{
              width: { base: 'full', lg: '203px' },
            }}
          >
            Request a Demo
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default WhyUs;
