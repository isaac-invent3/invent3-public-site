import { Avatar, Collapse, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface FooterSectionProps {
  isCollapse: boolean;
}
const FooterSection = (props: FooterSectionProps) => {
  const { isCollapse } = props;
  return (
    <HStack
      spacing="19px"
      px={isCollapse ? 0 : '24px'}
      position="relative"
      zIndex={999}
    >
      <Flex width={isCollapse ? 'full' : 'max-content'} justifyContent="center">
        <Avatar width="40px" height="40px" src={''} />
      </Flex>
      <Collapse in={!isCollapse}>
        <VStack spacing="4px" alignItems="flex-start" maxHeight="40px">
          <Text
            lineHeight="15.44px"
            fontSize="13px"
            letterSpacing="5%"
            fontWeight={700}
            textTransform="capitalize"
            color="neutral.100"
          >
            George Washington
          </Text>
          <Text color="neutral.600">Operation Manager</Text>
        </VStack>
      </Collapse>
    </HStack>
  );
};

export default FooterSection;
