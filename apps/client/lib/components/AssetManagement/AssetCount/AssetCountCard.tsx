'use client';

import { Box, Flex, Icon, Text, useDisclosure, VStack } from '@chakra-ui/react';
import {
  AssetCountByColumnName,
  ValidColumnNames,
} from '~/lib/interfaces/asset/general.interface';
import AssetListModal from './AssetListModal';
import { DefaultAssetCountIcon } from '../../CustomIcons';

interface AssetCountCardProps {
  data: AssetCountByColumnName;
  type: ValidColumnNames;
}
const AssetCountCard = (props: AssetCountCardProps) => {
  const { data, type } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg="gray.100"
        borderRadius="16px"
        height="224px"
        boxShadow="md"
        textAlign="center"
        bgColor="#EBEBEB"
        overflow="hidden"
        cursor="pointer"
        transition="all 300ms ease-in-out"
        onClick={onOpen}
        _hover={{
          transform: 'translateY(-10px)',
          boxShadow: 'lg',
        }}
      >
        <VStack
          w="full"
          h="70%"
          alignItems="center"
          justifyContent="center"
          gap="1em"
        >
          <Flex w="64px" h="64px" alignItems="center" justifyContent="center">
            {data?.icon ? (
              <Box
                boxSize="64px"
                sx={{
                  '& svg': {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  },
                }}
                dangerouslySetInnerHTML={{ __html: data.icon }}
              />
            ) : (
              <Icon as={DefaultAssetCountIcon} boxSize="64px" />
            )}
          </Flex>

          <Text fontSize="lg" fontWeight={800} color="neutral.800">
            {data.name}
          </Text>
        </VStack>

        <VStack
          w="full"
          h="30%"
          bgColor="white"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="xl" fontWeight={800} color="primary.500">
            {data.assetCount}
          </Text>
        </VStack>
      </Box>
      {isOpen && (
        <AssetListModal
          isOpen={isOpen}
          onClose={onClose}
          name={data.name}
          columnId={data.id}
          columnName={type}
        />
      )}
    </>
  );
};

export default AssetCountCard;
