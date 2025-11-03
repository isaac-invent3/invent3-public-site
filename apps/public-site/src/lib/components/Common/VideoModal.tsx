'use client';

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  AspectRatio,
  useBreakpointValue,
} from '@chakra-ui/react';

interface YouTubeModalProps {
  /** YouTube video ID or full URL */
  videoUrl: string;
  /** Controls modal visibility */
  isOpen: boolean;
  /** Function to close modal */
  onClose: () => void;
}

/**
 * A reusable, mobile-responsive YouTube modal component.
 */
const YouTubeModal: React.FC<YouTubeModalProps> = ({
  videoUrl,
  isOpen,
  onClose,
}) => {
  // Extract YouTube ID if a full URL is passed
  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : url;
  };

  const videoId = getYouTubeId(videoUrl);

  // Adjust modal max width depending on screen size
  const modalSize = useBreakpointValue({ base: 'full', md: '4xl' });
  const modalPadding = useBreakpointValue({ base: '0', md: '4' });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <ModalContent
        bg="transparent"
        shadow="none"
        maxW={{ base: '100%', md: '900px' }}
        mx={{ base: '0', md: 'auto' }}
      >
        <ModalCloseButton color="white" top="10px" right="10px" />
        <ModalBody p={modalPadding}>
          <AspectRatio ratio={16 / 9} width="100%">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ borderRadius: '8px' }}
            />
          </AspectRatio>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default YouTubeModal;
