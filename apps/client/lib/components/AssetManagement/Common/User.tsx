import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';

interface UserProps {
  name: string | null;
  role: string | null;
  location?: string | null;
  department?: string | null;
  variant?: 'fullDetails' | 'userDetails';
  minWidth?: string;
  spacing?: string;
}
const User = (props: UserProps) => {
  const {
    name,
    role,
    department,
    location,
    variant = 'fullDetails',
    minWidth,
  } = props;

  const info = [
    {
      label: 'Department:',
      value: department ?? 'N/A',
    },
    {
      label: 'Location:',
      value: location ?? 'N/A',
    },
  ];

  return (
    <HStack width="full" spacing="24px" alignItems="flex-start">
      <Avatar
        width={variant === 'fullDetails' ? '99px' : '40px'}
        height={variant === 'fullDetails' ? '99px' : '40px'}
        src=""
      />
      <VStack spacing="24px" alignItems="flex-start">
        <VStack alignItems="flex-start" spacing="8px">
          <Heading as="h5" size="md" color="black">
            {name}
          </Heading>
          <Text color="neutral.600">{role}</Text>
        </VStack>
        {variant === 'fullDetails' && (
          <VStack alignItems="flex-start" spacing="8px">
            {info.map((item) => (
              <HStack width="full">
                <Text size="md" color="neutral.600" minW={minWidth ?? '78px'}>
                  {item.label}
                </Text>
                <Text size="md" color="black">
                  {item.value}
                </Text>
              </HStack>
            ))}
          </VStack>
        )}
      </VStack>
    </HStack>
  );
};

export default User;
