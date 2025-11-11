import { HStack, Text } from '@chakra-ui/react';

const CustomDateHeader = ({ label }: { label: string }) => {
  const [day, date] = label.split(' ');

  return (
    <HStack spacing={{ base: '2px', md: '8px' }}>
      <Text color="neutral.600" textTransform="uppercase">
        {day}
      </Text>
      <Text color="neutral.800" size="lg" fontWeight={800}>
        {date}
      </Text>
    </HStack>
  );
};

export default CustomDateHeader;
