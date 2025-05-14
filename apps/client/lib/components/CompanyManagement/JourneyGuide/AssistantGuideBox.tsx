import {
  Flex,
  FlexProps,
  Heading,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { JourneyIcon } from '../../CustomIcons';
import JourneyGuide from '.';

interface AssistantGuideBoxProps {
  containerStyle?: FlexProps;
}

const AssistantGuideBox = (props: AssistantGuideBoxProps) => {
  const { containerStyle } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Flex
        bgColor="white"
        width="317px"
        bgImage="/assitant-ellipse.png"
        backgroundPosition="60% top"
        bgRepeat="no-repeat"
        rounded="24px"
        overflow="hidden"
        cursor="pointer"
        onClick={onOpen}
        height="45px"
        {...containerStyle}
      >
        {/* Left Side Starts Here */}
        <VStack
          width="58%"
          alignItems="flex-start"
          spacing={{ base: '24px', lg: '88px' }}
          bgColor="#DBDAD680"
          backdropFilter="blur(40px)"
          pl="16px"
          justifyContent="center"
          border="1px solid white"
        >
          <HStack spacing="16px">
            <Icon as={JourneyIcon} boxSize="24px" />
            <Heading fontWeight={800} fontSize={{ base: '16px' }}>
              Assistant Guide
            </Heading>
          </HStack>
        </VStack>
        <VStack width="42%" justifyContent="center">
          <Text fontWeight={700} size="md" color="blue.500">
            Task Pending
          </Text>
        </VStack>
      </Flex>
      <JourneyGuide isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AssistantGuideBox;
