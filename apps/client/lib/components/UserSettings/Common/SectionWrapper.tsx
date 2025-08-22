import { Stack, StackProps, Text, TextProps, VStack } from '@chakra-ui/react';
import { isArray } from 'lodash';
import React from 'react';

interface SectionWrapperProps extends StackProps {
  title: string;
  subtitle: string | (string | string[])[];
  children?: React.ReactNode;
  sectionInfoWidth?: string;
  sectionInfoStyle?: StackProps;
  subtitleStyle?: TextProps;
  nestedSubtitleStyle?: TextProps;
}
const SectionWrapper = (props: SectionWrapperProps) => {
  const {
    title,
    subtitle,
    sectionInfoWidth = 'full',
    children,
    sectionInfoStyle,
    subtitleStyle,
    nestedSubtitleStyle,
    ...rest
  } = props;
  return (
    <Stack
      width="full"
      alignItems="flex-start"
      justifyContent="space-between"
      direction="row"
      spacing={0}
      {...rest}
    >
      <VStack
        alignItems="flex-start"
        spacing="8px"
        width="full"
        maxW={sectionInfoWidth}
        {...sectionInfoStyle}
      >
        <Text color="black" size="md">
          {title}
        </Text>

        {isArray(subtitle) ? (
          <Text color="neutral.600" fontWeight={400}>
            {subtitle.map((item, index) =>
              isArray(item) ? (
                item.map((content, index) => (
                  <Text
                    color="neutral.600"
                    fontWeight={700}
                    as="span"
                    key={index}
                    {...nestedSubtitleStyle}
                  >
                    {content}{' '}
                  </Text>
                ))
              ) : (
                <Text
                  color="neutral.600"
                  fontWeight={400}
                  as="span"
                  {...subtitleStyle}
                  key={index}
                >
                  {item}{' '}
                </Text>
              )
            )}
          </Text>
        ) : (
          <Text color="neutral.600" fontWeight={400} {...subtitleStyle}>
            {subtitle}{' '}
          </Text>
        )}
      </VStack>
      {children}
    </Stack>
  );
};

export default SectionWrapper;
