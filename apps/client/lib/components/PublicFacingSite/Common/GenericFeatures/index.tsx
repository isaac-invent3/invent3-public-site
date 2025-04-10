import { Box, Heading, Stack, StackProps, VStack } from '@chakra-ui/react';
import React, { useLayoutEffect, useRef, useState } from 'react';
import SingleFeature from './SingleFeature';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GenericFeaturesProps {
  featureItems: {
    tabIndex: number;
    tabName: string;
    title: string;
    description: string;
    image: string;
  }[];
  buttonText: string;
  buttonLink: string;
  containerStyles?: StackProps;
  tabColor?: string;
  featureDescriptionColor?: string;
  containerRef?: React.MutableRefObject<HTMLDivElement | null>;
}
const GenericFeatures = (props: GenericFeaturesProps) => {
  const {
    featureItems,
    buttonLink,
    buttonText,
    containerStyles,
    tabColor,
    featureDescriptionColor,
    containerRef,
  } = props;
  const [activeTab, setActiveTab] = useState(0);
  const featureRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef?.current) return;

    const ctx = gsap.context(() => {
      const totalTabs = featureItems.length;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef?.current,
          start: 'top top',
          end: `+=${totalTabs * window.innerHeight}`,
          scrub: true,
          pin: featureRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            const newTab = Math.floor(self.progress * totalTabs);
            if (newTab !== activeTab && newTab < totalTabs) {
              setActiveTab(newTab);
            }
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [featureItems.length]);

  return (
    <Stack
      width="full"
      bgColor="white"
      rounded="16px"
      pt={{ base: '32px', lg: '82px' }}
      px={{ base: '16px', lg: '48px' }}
      pb={{ lg: '36px' }}
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: '32px', lg: '68px' }}
      alignItems="flex-start"
      justifyContent="flex-start"
      overflow="hidden"
      {...containerStyles}
      ref={containerRef}
    >
      <Stack
        direction={{ base: 'row', lg: 'column' }}
        spacing={{ base: '24px', lg: '54px' }}
        minW={{ base: 'full', lg: 'min-content' }}
        width={{ base: 'full', lg: 'min-content' }}
        overflow={{ base: 'scroll', lg: 'none' }}
      >
        {featureItems.map((item) => (
          <VStack
            alignItems="flex-start"
            spacing={0}
            cursor="pointer"
            onClick={() => setActiveTab(item.tabIndex)}
          >
            <Heading
              key={item.tabIndex}
              color={
                activeTab === item.tabIndex
                  ? 'primary.500'
                  : (tabColor ?? 'neutral.300')
              }
              fontSize={{ base: '14px', lg: '20px' }}
              lineHeight={{ base: '16px', lg: '24px' }}
              fontWeight={800}
              width="full"
              minW="126px"
              whiteSpace={{ lg: 'nowrap' }}
              maxW={{ base: '126px', lg: 'full' }}
              height={{ base: 'full' }}
            >
              {item.tabName}
            </Heading>
            {activeTab === item.tabIndex && (
              <Box
                bgColor="secondary.purple.500"
                height="4px"
                width={{ base: 'full', lg: '80%' }}
              />
            )}
          </VStack>
        ))}
      </Stack>
      {featureItems.map(
        (item) =>
          item.tabIndex === activeTab && (
            <SingleFeature
              key={item.tabIndex}
              title={item.title}
              description={item.description}
              image={item.image}
              buttonLink={buttonLink}
              buttonText={buttonText}
              featureDescriptionColor={featureDescriptionColor}
            />
          )
      )}
    </Stack>
  );
};

export default GenericFeatures;
