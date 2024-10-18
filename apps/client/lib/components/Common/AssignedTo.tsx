import { Avatar, HStack, Text } from '@chakra-ui/react';

const AssignedTo = (name: string | null) => {
  return (
    <HStack spacing="8px">
      <Avatar width="30px" height="30px" />
      {name && <Text color="black">{name}</Text>}
    </HStack>
  );
};

export default AssignedTo;
