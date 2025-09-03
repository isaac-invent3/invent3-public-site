import { Text, VStack } from '@chakra-ui/react';
import { isEmpty } from 'lodash';

interface InfoProps {
  label: string;
  value: string | number | React.ReactNode;
}
const Info = (props: InfoProps) => {
  const { label, value } = props;

  return (
    <VStack width="full" spacing="4px" alignItems="flex-start">
      <Text color="neutral.600">{label}</Text>
      <Text
        size="md"
        color="neutral.800"
        overflow="hidden"
        textOverflow="ellipsis"
        maxW="full"
      >
        {isEmpty(value) ? 'N/A' : value}
      </Text>
    </VStack>
  );
};

export default Info;
