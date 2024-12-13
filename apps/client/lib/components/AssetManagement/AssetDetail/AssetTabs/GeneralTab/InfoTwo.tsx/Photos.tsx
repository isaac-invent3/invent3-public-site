import { useEffect, useState } from 'react';
import { VStack, Flex, useDisclosure, Skeleton, Text } from '@chakra-ui/react';
import { useGetImagesByAssetIdQuery } from '~/lib/redux/services/asset/general.services';
import { useAppSelector } from '~/lib/redux/hooks';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { AssetImage } from '~/lib/interfaces/asset.interfaces';
import PhotoViewerModal from '~/lib/components/AssetManagement/Common/PhotoViewerModal';

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

      <PhotoViewerModal
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isOpen={isOpen}
        onClose={closeModal}
        photos={photos.map(
          (photo) => `${photo?.base64Prefix}${photo?.photoImage}`
        )}
      />
    </VStack>
  );
};

export default PhotoViewer;
