import { useEffect, useRef, useState } from 'react';
import GenericModal from '.';
import {
  Heading,
  Image as ChakraImage,
  ModalBody,
  ModalContentProps,
  StackProps,
  Text as ChakraText,
  VStack,
  ModalProps,
} from '@chakra-ui/react';

interface GenericSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  successText?: string;
  children?: React.ReactNode;
  headingText?: string;
  customStyle?: ModalContentProps;
  contentStyle?: StackProps;
  mainModalStyle?: Omit<ModalProps, 'isOpen' | 'onClose' | 'children'>;
}
const GenericSuccessModal = (props: GenericSuccessModalProps) => {
  const {
    isOpen,
    onClose,
    successText,
    children,
    headingText,
    customStyle,
    contentStyle,
    mainModalStyle,
  } = props;
  const checkVideoRef = useRef<HTMLVideoElement>(null);
  const [showRibbon, setShowRibbon] = useState(false);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/success-check.mp4';
    video.preload = 'auto';
  }, []);

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
      mainModalStyle={mainModalStyle}
      contentStyle={{
        width: { base: 'full', sm: '400px', md: '526px' },
        ...customStyle,
      }}
    >
      <ModalBody p={0} m={0} width="full">
        <VStack
          spacing="48px"
          width="full"
          py={{ base: '24px', md: '40px' }}
          px={{ base: '32px', md: '74px' }}
          {...contentStyle}
        >
          {showRibbon && (
            <ChakraImage
              src="/success-ribbon.gif"
              width="290px"
              minH="full"
              position="absolute"
            />
          )}
          <VStack width="full" spacing="24px">
            <VStack width="60px" align="center" position="relative">
              <video
                ref={checkVideoRef}
                style={{ display: 'block' }}
                src="/success-check.webm"
                playsInline
                muted
                autoPlay
                preload="auto"
              />
            </VStack>
            <VStack spacing="8px" width="full">
              <Heading
                size={{ base: 'lg', md: 'xl' }}
                fontWeight={800}
                color="primary.500"
                textAlign="center"
              >
                {headingText ?? 'Successful!'}
              </Heading>
              {successText && (
                <ChakraText
                  size="md"
                  color="neutral.600"
                  textAlign="center"
                  maxW="306px"
                >
                  {successText}
                </ChakraText>
              )}
            </VStack>
          </VStack>
          {children}
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default GenericSuccessModal;
