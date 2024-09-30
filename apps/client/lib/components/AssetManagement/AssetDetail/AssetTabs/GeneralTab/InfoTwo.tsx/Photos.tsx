import { useEffect, useState } from 'react';
import {
  VStack,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  useDisclosure,
  Skeleton,
  Text,
  ModalFooter,
} from '@chakra-ui/react';
import { useGetImagesByAssetIdQuery } from '~/lib/redux/services/asset/general.services';
import { useAppSelector } from '~/lib/redux/hooks';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import Button from '~/lib/components/UI/Button';
import { AssetImage } from '~/lib/interfaces/asset.interfaces';

const PhotoViewer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const { assetId } = useAppSelector((state) => state.asset.asset);
  const [photos, setPhotos] = useState<AssetImage[]>([]);
  const { data, isLoading } = useGetImagesByAssetIdQuery(
    { id: assetId },
    { skip: !assetId }
  );

  const openModal = (index: number) => {
    setCurrentIndex(index);
    onOpen();
  };

  const closeModal = () => {
    setCurrentIndex(null);
    onClose();
  };

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

  useEffect(() => {
    if (data?.data?.items) {
      setPhotos(data?.data?.items);
    }
  }, [data]);

  return (
    <VStack alignItems="flex-start" spacing="16px" width="full">
      <DetailHeader variant="secondary">Photos</DetailHeader>
      <Flex width="full" gap="16px" wrap="wrap">
        {isLoading ? (
          Array(4)
            .fill('')
            .map((_, idx) => (
              <Skeleton width="60px" height="60px" rounded="8px" key={idx} />
            ))
        ) : photos.length >= 1 ? (
          photos.map((photo: AssetImage, index: number) => (
            <Flex
              key={index}
              width="60px"
              height="60px"
              rounded="8px"
              bgColor="white"
              boxShadow="md"
              bgSize="contain"
              bgRepeat="no-repeat"
              bgPosition="center"
              bgImage={`${photo.base64Prefix}${photo.photoImage}`}
              cursor="pointer"
              onClick={() => openModal(index)}
            />
          ))
        ) : (
          <Text
            width="full"
            size="md"
            fontWeight={400}
            fontStyle="italic"
            my="41px"
            color="neutral.600"
            textAlign="center"
          >
            No Photos at the moment
          </Text>
        )}
      </Flex>

      {/* Modal for displaying large photo */}
      <Modal isOpen={isOpen} onClose={closeModal} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent height="500px">
          <ModalCloseButton p={4} />
          <ModalBody px={8} pt={16}>
            {currentIndex !== null && (
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="90%"
              >
                <Image
                  src={`${photos[currentIndex]?.base64Prefix}${photos[currentIndex]?.photoImage}`}
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
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default PhotoViewer;
