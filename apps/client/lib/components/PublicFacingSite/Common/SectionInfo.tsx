import {
  Heading,
  HeadingProps,
  StackProps,
  Text,
  TextProps,
  VStack,
} from '@chakra-ui/react';
import { isArray } from 'lodash';
import React from 'react';

interface SectionInfoProps {
  badgeText?: string;
  heading: (string | string[])[];
  description?: string;
  ref?: React.MutableRefObject<HTMLDivElement | null>;
  descriptionStyles?: TextProps;
  containerStyles?: StackProps;
  badgeStyles?: TextProps;
  headingStyles?: HeadingProps;
  headingPrimaryColor?: string;
}

const SectionInfo = (props: SectionInfoProps) => {
  const {
    badgeText,
    heading,
    description,
    ref,
    containerStyles,
    badgeStyles,
    descriptionStyles,
    headingStyles,
    headingPrimaryColor = 'black',
  } = props;
  return (
    <VStack
      width="full"
      spacing="24px"
      alignItems="flex-start"
      ref={ref}
      {...containerStyles}
    >
      {badgeText && (
        <Text
          py="12px"
          px="16px"
          color="primary.500"
          bgColor="neutral.250"
          rounded="full"
          {...badgeStyles}
        >
          {badgeText}
        </Text>
      )}
      <Heading
        fontWeight={800}
        fontSize={{ base: '24px', md: '40px' }}
        lineHeight={{ base: '28.51px', md: '47.52px' }}
        {...headingStyles}
        as="span"
      >
        {heading.map((item, index) =>
          isArray(item) ? (
            item.map((content, index) => (
              <Heading
                as="span"
                color="#B279A2"
                fontWeight={800}
                fontSize={{ base: '24px', md: '40px' }}
                lineHeight={{ base: '28.51px', md: '47.52px' }}
                key={index}
                {...headingStyles}
              >
                {content}{' '}
              </Heading>
            ))
          ) : (
            <Heading
              as="span"
              color={headingPrimaryColor}
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
              key={index}
              {...headingStyles}
            >
              {item}{' '}
            </Heading>
          )
        )}
      </Heading>
      {description && (
        <Text
          fontSize={{ base: '14px', md: '16px' }}
          lineHeight={{ base: '20px', md: '24px' }}
          color="primary.accent"
          fontWeight={400}
          maxW="578px"
          {...descriptionStyles}
        >
          {description}
        </Text>
      )}
    </VStack>
  );
};

export default SectionInfo;
