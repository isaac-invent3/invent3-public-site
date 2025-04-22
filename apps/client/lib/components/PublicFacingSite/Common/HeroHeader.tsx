import {
  Flex,
  Heading,
  HeadingProps,
  StackProps,
  Text,
  TextProps,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

interface HeroHeaderProps {
  title: string;
  subtitle: string;
  customHeading?: HeadingProps;
  containerStyle?: StackProps;
  subTitleStyle?: TextProps;
  bgMobile?: string;
  bgDesktop: string;
  children?: React.ReactNode;
}
const HeroHeader = (props: HeroHeaderProps) => {
  const {
    title,
    subtitle,
    customHeading,
    containerStyle,
    subTitleStyle,
    bgMobile,
    bgDesktop,
    children,
  } = props;

  return (
    <Flex
      justifyContent="center"
      width="full"
      position="relative"
      direction="column"
      alignItems="center"
      bgImage={{
        base: bgMobile ?? bgDesktop,
        lg: bgDesktop,
      }}
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Flex
        width="full"
        height="full"
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        background="linear-gradient(126.77deg, rgba(0, 0, 0, 0) -12.53%, #000000 69.14%)"
      />
      <Flex
        width="full"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        py={{ base: '69px', lg: '84px' }}
        position="relative"
        direction="column"
        gap="16px"
        alignItems="center"
        zIndex={9}
      >
        <VStack
          spacing={{ base: '16px', lg: '24px' }}
          width="full"
          {...containerStyle}
        >
          <Heading
            fontWeight={800}
            fontSize={{ base: '24px', lg: '40px' }}
            lineHeight="100%"
            color="white"
            width="full"
            maxW="851px"
            textAlign="center"
            {...customHeading}
          >
            {title}
          </Heading>
          <Text
            color="white"
            fontSize={{ base: '14px', lg: '16px' }}
            lineHeight={{ base: '18px', lg: '24px' }}
            fontWeight={400}
            maxW="808px"
            textAlign="center"
            {...subTitleStyle}
          >
            {subtitle}
          </Text>
        </VStack>
        {children}
      </Flex>
    </Flex>
  );
};

export default HeroHeader;
