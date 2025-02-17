import { Avatar, Collapse, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

interface FooterSectionProps {
  isCollapse: boolean;
}
const FooterSection = (props: FooterSectionProps) => {
  const { isCollapse } = props;
  const { data } = useSession();

  return (
    <HStack spacing="19px" px="24px" position="relative" zIndex={999} mt="24px">
      <Flex width={isCollapse ? 'full' : 'max-content'} justifyContent="center">
        <Avatar width="40px" height="40px" name={data?.user.name ?? ''} />
      </Flex>
      <Collapse in={!isCollapse}>
        <VStack spacing="4px" alignItems="flex-start" maxHeight="40px">
          <Text
            lineHeight="15.44px"
            fontSize="13px"
            letterSpacing="0.05em"
            fontWeight={700}
            textTransform="capitalize"
            color="neutral.100"
          >
            {data?.user?.name}
          </Text>
          <Text color="neutral.600" textTransform="capitalize">
            {data?.user?.role}
          </Text>
        </VStack>
      </Collapse>
    </HStack>
  );
};

export default FooterSection;
