import React, { useEffect, useRef, useState } from 'react';
import GenericModal from '../Modal';
import { Heading, Image, Text, VStack } from '@chakra-ui/react';

interface GenericSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  successText: string;
  children: React.ReactNode;
  headingText?: string;
  customStyle?: { [key: string]: unknown };
}
const GenericSuccessModal = (props: GenericSuccessModalProps) => {
  const { isOpen, onClose, successText, children, headingText, customStyle } =
    props;
  const checkVideoRef = useRef<HTMLVideoElement>(null);
  const [showRibbon, setShowRibbon] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowRibbon(true);

      if (checkVideoRef.current) {
        checkVideoRef.current.play();
      }

      // Hide the ribbon after 5 seconds
      const timer = setTimeout(() => {
        setShowRibbon(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
        setShowRibbon(false);
      };
    } else {
      setShowRibbon(false); // Ensure the ribbon is hidden when the modal closes
    }
  }, [isOpen]);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setShowRibbon(false);
      }}
      contentStyle={{ width: { lg: '526px' }, ...customStyle }}
    >
      <VStack spacing="48px" width="full" pb={{ lg: '40px' }} px="74px">
        {showRibbon && (
          <Image
            src="/success-ribbon.gif"
            width="290px"
            minH="full"
            position="absolute"
          />
        )}
        <VStack width="full" spacing="24px" pt={{ lg: '48px' }}>
          <VStack width="60px" align="center" position="relative">
            <video
              ref={checkVideoRef}
              style={{ display: 'block' }}
              src="/success-check.webm"
              playsInline
              muted
              autoPlay
            />
          </VStack>
          <VStack spacing="8px" width="full">
            <Heading
              fontSize="32px"
              lineHeight="38.02px"
              fontWeight={800}
              color="primary.main"
              textAlign="center"
            >
              {headingText ?? 'Successful!'}
            </Heading>
            <Text size="md" color="neutral.600" textAlign="center" maxW="306px">
              {successText}
            </Text>
          </VStack>
        </VStack>
        {children}
      </VStack>
    </GenericModal>
  );
};

export default GenericSuccessModal;
