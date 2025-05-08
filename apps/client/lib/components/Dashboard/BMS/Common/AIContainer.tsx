import { HStack, Icon, StackProps, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { AIIcon } from '~/lib/components/CustomIcons/Dashboard';

interface AIContainerProps {
  children?: React.ReactNode;
  title: string;
  subContentStyle?: StackProps;
}
const AIContainer = (props: AIContainerProps) => {
  const { children, title, subContentStyle } = props;
  return (
    <VStack
      width="full"
      height="full"
      background="radial-gradient(47.59% 103.79% at 52.41% 52.55%, rgba(160, 131, 247, 0.4) 0%, rgba(39, 0, 157, 0.4) 100%)"
      boxShadow="0px 8px 24px -16px #FFFFFF3D inset,
    0px 24px 32px -16px #4400BF36,
    0px -24px 32px 0px #FFFFFF38 inset,
    0px 8px 16px -8px #5B00FF1F,
    0px 0px 12px 0px #FFFFFF inset,
    0px 2px 4px -8px #5B00FF14"
      spacing="17.5px"
      rounded="8px"
      pt="11px"
      px="8px"
      pb="8px"
      alignItems="flex-start"
    >
      <HStack spacing="8px" px="8px">
        <Icon as={AIIcon} boxSize="24px" />
        <Text fontWeight={700} fontSize="14px" lineHeight="100%">
          {title}
        </Text>
      </HStack>
      <VStack
        bgColor="white"
        borderTopRadius="12px"
        borderBottomRadius="8px"
        width="full"
        {...subContentStyle}
        alignItems="flex-start"
        py="8px"
        px="16px"
        height="full"
      >
        <Text size="md">Jarvis suggests...</Text>
        {children}
      </VStack>
    </VStack>
  );
};

export default AIContainer;
