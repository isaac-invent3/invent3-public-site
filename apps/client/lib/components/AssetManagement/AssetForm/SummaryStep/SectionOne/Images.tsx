import { Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import PhotoViewerModal from '../../../Common/PhotoViewerModal';

const Images = () => {
  const { images } = useAppSelector((state) => state.asset.assetForm);
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <VStack spacing="8px" width="full" alignItems="flex-start">
        <DetailHeader variant="primary">Asset Images</DetailHeader>
        <HStack alignItems="flex-end" spacing="8px" width="full">
          <HStack spacing="12px" wrap="wrap">
            {images.slice(0, 3).map((image, index) => (
              <Flex
                position="relative"
                width="100px"
                height="75px"
                rounded="8px"
                key={index}
                overflow="hidden"
              >
                <Image
                  src={
                    image.base64Prefix
                      ? `${image.base64Prefix}${image.base64PhotoImage}`
                      : image.base64PhotoImage
                  }
                  alt="asset image"
                  fill
                />
              </Flex>
            ))}
          </HStack>
          {images.length > 3 && (
            <Text
              color="blue.500"
              textDecoration="underline"
              role="button"
              onClick={onOpen}
            >
              View more
            </Text>
          )}
          
        </HStack>
      </VStack>
      <PhotoViewerModal
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isOpen={isOpen}
        onClose={onClose}
        photos={images.map((image) =>
          image.base64Prefix
            ? `${image.base64Prefix}${image.base64PhotoImage}`
            : image.base64PhotoImage
        )}
      />
    </>
  );
};

export default Images;
