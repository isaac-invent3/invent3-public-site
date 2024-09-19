import { Flex, HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { AssetFormImages } from '~/lib/interfaces/asset.interfaces';

const Images = ({ images }: { images: AssetFormImages[] }) => {
  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <DetailHeader variant="primary">Asset Images</DetailHeader>
      <HStack spacing="12px" wrap="wrap" width="full">
        {images.map((image, index) => (
          <Flex
            position="relative"
            width="100px"
            height="75px"
            rounded="8px"
            key={index}
            overflow="hidden"
          >
            <Image src={image.base64PhotoImage} alt="asset image" fill />
          </Flex>
        ))}
      </HStack>
    </VStack>
  );
};

export default Images;
