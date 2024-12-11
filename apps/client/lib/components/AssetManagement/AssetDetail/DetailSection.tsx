import { HStack, Text, VStack } from '@chakra-ui/react';
import DetailHeader from '../../UI/DetailHeader';

interface DetailSectionProps {
  details: {
    label: string;
    value: string | number | React.ReactNode;
  }[];
  minWidth: string;
  header?: string;
}

const DetailSection = (props: DetailSectionProps) => {
  const { details, minWidth, header } = props;
  return (
    <VStack alignItems="flex-start" spacing="16px" width="full">
      {header && <DetailHeader variant="secondary">{header}</DetailHeader>}
      <VStack alignItems="flex-start" spacing="8px" width="full">
        {details.map((item, index) => (
          <HStack spacing="8px" alignItems="flex-start" key={index}>
            <Text size="md" minW={minWidth} color="neutral.600">
              {item.label}
            </Text>
            <Text size="md">{item.value}</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default DetailSection;
