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
  Box,
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
  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : url;
  };

  const videoId = getYouTubeId(videoUrl);

  const modalSize = useBreakpointValue({ base: 'full', md: '4xl' });
  const modalPadding = useBreakpointValue({ base: '0', md: '4' });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <ModalContent
        bg="transparent"
        shadow="none"
        maxW={{ base: '90%', md: '900px' }}
        mx={{ base: '0', md: 'auto' }}
        position="relative"
        // alignItems="center"
        justifyContent="center"
      >
        {/* Wrap in Box to manage z-index */}

        <ModalBody p={modalPadding} maxH="max-content" position="relative">
          <Box
            position="absolute"
            top={{ base: '5px', md: '10px' }}
            right={{ base: '5px', md: '10px' }}
            zIndex={10}
          >
            <ModalCloseButton color="white" />
          </Box>
          <AspectRatio ratio={16 / 9} width="100%">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{
                borderRadius: '8px',
                zIndex: 1,
              }}
            />
          </AspectRatio>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default YouTubeModal;
