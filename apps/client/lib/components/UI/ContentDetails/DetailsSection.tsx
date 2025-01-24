import { HStack, StackProps, Text, TextProps, VStack } from '@chakra-ui/react';
import DetailHeader from '../DetailHeader';

interface DetailSectionProps {
  details: {
    label: string;
    value: string | number | React.ReactNode;
  }[];
  labelMinWidth: string;
  header?: string;
  labelStyle?: TextProps;
  valueStyle?: TextProps;
  itemContainerStyle?: StackProps;
  outerContainerStyle?: StackProps;
  wrapperStyle?: StackProps;
}

const DetailSection = (props: DetailSectionProps) => {
  const {
    details,
    labelMinWidth,
    header,
    labelStyle,
    valueStyle,
    itemContainerStyle,
    outerContainerStyle,
    wrapperStyle,
  } = props;

  return (
    <VStack
      alignItems="flex-start"
      spacing="16px"
      width="full"
      {...wrapperStyle}
    >
      {header && <DetailHeader variant="secondary">{header}</DetailHeader>}
      <VStack
        alignItems="flex-start"
        spacing="8px"
        width="full"
        {...outerContainerStyle}
      >
        {details.map((item, index) => (
          <HStack
            key={index}
            spacing="8px"
            alignItems="flex-start"
            {...itemContainerStyle}
          >
            <Text
              size="md"
              minW={labelMinWidth}
              color="neutral.600"
              {...labelStyle}
            >
              {item.label}
            </Text>
            <Text size="md" {...valueStyle}>
              {item.value}
            </Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default DetailSection;
