import { Flex, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { Button, GenericModal } from '@repo/ui/components';
import React from 'react';
import { CloseIcon, JourneyIcon } from '../../CustomIcons';

interface AssistanceGuideProps {
  isOpen: boolean;
  onClose: () => void;
}
const AssistanceGuide = (props: AssistanceGuideProps) => {
  const { isOpen, onClose } = props;
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      mainModalStyle={{ isCentered: false }}
      contentStyle={{
        width: 'full',
        p: 0,
        bgColor: 'transparent',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        pt: '100px',
        justifyContent: 'flex-end',
      }}
    >
      <Flex
        bgColor="#E4E3DF"
        width={{ base: 'full', lg: '550px' }}
        bgImage="/journey-main-bg.jpg"
        bgSize="cover"
        rounded="24px"
        overflow="hidden"
      >
        {/* Left Side Starts Here */}
        <VStack
          width={{ base: 'full', lg: '50%' }}
          alignItems="flex-start"
          spacing={{ base: '24px', lg: '88px' }}
          bgColor="#DBDAD680"
          backdropFilter="blur(40px)"
          pl="24px"
          py={{ base: '20px' }}
          roundedLeft="full"
          overflow="hidden"
        >
          <VStack alignItems="flex-start" spacing="20px">
            <HStack spacing="16px">
              <Icon as={JourneyIcon} boxSize="24px" />
              <Heading fontWeight={800} fontSize={{ base: '24px' }}>
                Assistant Guide
              </Heading>
            </HStack>
            <Text
              size={{ base: 'md', lg: 'lg' }}
              lineHeight={{ base: '100%', lg: '150%' }}
              fontWeight={400}
              maxW="247px"
            >
              Your company setup is pending completion. Click the button to
              continue
            </Text>
          </VStack>
        </VStack>
        <VStack
          width={{ base: 'full', lg: '50%' }}
          justifyContent="space-between"
          px={{ base: '24px' }}
          py={{ base: '20px' }}
          alignItems="flex-end"
          position="relative"
          display={{ base: 'none', lg: 'flex' }}
          spacing="14px"
        >
          <Icon
            as={CloseIcon}
            boxSize="20px"
            color="#F50000"
            cursor="pointer"
            onClick={() => onClose()}
          />
          <Text
            width="full"
            fontWeight={800}
            fontSize="20px"
            lineHeight="100%"
            textAlign="center"
          >
            3
            <Text as="span" fontWeight={800} fontSize="14px" lineHeight="100%">
              /5
            </Text>{' '}
            steps pending
          </Text>
          <Button customStyles={{ height: '33px' }}>Continue</Button>
        </VStack>
      </Flex>
    </GenericModal>
  );
};

export default AssistanceGuide;
