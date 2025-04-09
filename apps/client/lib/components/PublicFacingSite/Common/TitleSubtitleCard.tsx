import { StackProps, Text, TextProps, VStack } from '@chakra-ui/react';
import React from 'react';

interface TitleSubtitleCardProps {
  containerStyles?: StackProps;
  titleStyles?: TextProps;
  subtitleStyles?: TextProps;
  title: string;
  subtitle: string;
}

const TitleSubtitleCard = (props: TitleSubtitleCardProps) => {
  const { containerStyles, titleStyles, subtitleStyles, title, subtitle } =
    props;
  return (
    <VStack alignItems="flex-start" spacing="12px" {...containerStyles}>
      <Text
        color="primary.500"
        fontSize={{ base: '16px' }}
        lineHeight="24px"
        fontWeight={700}
        {...titleStyles}
      >
        {title}
      </Text>
      <Text color="neutral.800" fontWeight={400} {...subtitleStyles}>
        {subtitle}
      </Text>
    </VStack>
  );
};

export default TitleSubtitleCard;
