import {
  Icon,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React from 'react';
import { PlayIcon } from '../../CustomIcons';
import YouTubeModal from '../../Common/VideoModal';

const Info = [
  {
    title: 'Minimize Downtime',
    subtitle: 'Reduce unexpected failures with predictive maintenance.',
  },
  {
    title: 'Cut Operational Costs',
    subtitle: 'Optimize asset usage and extend equipment lifespan.',
  },
  {
    title: 'Stay Compliant',
    subtitle: 'Automate regulatory tracking to avoid fines and penalties.',
  },
  {
    title: 'Increase Productivity',
    subtitle: 'Free up teams by automating asset workflows.',
  },
  {
    title: 'Gain Full Visibility',
    subtitle: 'Access real-time insights across all locations and devices.',
  },
];
const KeyPoints = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack width="full" spacing="56px" alignItems="flex-start">
        <SimpleGrid
          columns={{ base: 2, md: 3 }}
          rowGap={{ base: '24px', lg: '40px' }}
          columnGap={{ base: '16px', lg: '32px' }}
        >
          {Info.map((item, index) => (
            <VStack
              alignItems="flex-start"
              spacing="12px"
              key={index}
              p={0}
              m={0}
            >
              <Text
                color="primary.500"
                fontSize={{ base: '16px' }}
                lineHeight="24px"
                fontWeight={700}
              >
                {item.title}
              </Text>
              <Text color="neutral.800" fontWeight={400}>
                {item.subtitle}
              </Text>
            </VStack>
          ))}
          <Button
            customStyles={{
              display: { base: 'none', md: 'flex' },
              width: { base: 'full', md: 'full' },
              px: 1,
            }}
            handleClick={onOpen}
          >
            <Icon as={PlayIcon} boxSize="24px" mr="8px" color="white" /> Watch
            Video
          </Button>
        </SimpleGrid>
        <Button
          customStyles={{
            display: { base: 'flex', md: 'none' },
            width: 'full',
          }}
          handleClick={onOpen}
        >
          <Icon as={PlayIcon} boxSize="24px" mr="8px" color="white" /> Watch
          Video
        </Button>
      </VStack>
      <YouTubeModal
        isOpen={isOpen}
        onClose={onClose}
        videoUrl="https://youtu.be/1TQ-Q72vWv8"
      />
    </>
  );
};

export default KeyPoints;
