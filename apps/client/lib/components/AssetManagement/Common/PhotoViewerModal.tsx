import {
  Flex,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react';
import { Button, GenericModal } from '@repo/ui/components';
import React from 'react';

interface PhotoViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | null>>;
  currentIndex: number | null;
  photos: string[];
}
const PhotoViewerModal = (props: PhotoViewerModalProps) => {
  const { isOpen, onClose, currentIndex, setCurrentIndex, photos } = props;

  const goNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex !== null && prevIndex < photos.length - 1
        ? prevIndex + 1
        : prevIndex
    );
  };

  const goPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      mainModalStyle={{ size: 'xl', isCentered: true }}
      contentStyle={{ height: { base: '400px', md: '500px' }, width: '600px' }}
    >
      <ModalCloseButton p={4} />
      <ModalBody px={8} pt={16}>
        {currentIndex !== null && (
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="90%"
            overflow="hidden"
            objectFit="contain"
          >
            <Image
              src={photos[currentIndex]}
              alt={`Photo ${currentIndex + 1}`}
            />
          </Flex>
        )}
      </ModalBody>
      <ModalFooter>
        <Flex justifyContent="space-between" width="full">
          <Button
            variant="secondary"
            handleClick={goPrev}
            isDisabled={currentIndex === 0}
            customStyles={{ width: '100px' }}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            handleClick={goNext}
            isDisabled={currentIndex === photos.length - 1}
            customStyles={{ width: '100px' }}
          >
            Next
          </Button>
        </Flex>
      </ModalFooter>
    </GenericModal>
  );
};

export default PhotoViewerModal;
