'use client';

import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { AssetCountByColumnName } from '~/lib/interfaces/asset/general.interface';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateAssetFilter } from '~/lib/redux/slices/AssetSlice';

interface AssetCountCardProps {
  data: AssetCountByColumnName;
}
const AssetCountCard = (props: AssetCountCardProps) => {
  const { data } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();

  updateAssetFilter;

  const goToAssetPage = () => {
    const params = new URLSearchParams({
      assetClass: data.name,
      assetClassId: data.id.toString(),
    });

    router.push(`/asset-management?${params.toString()}`);
  };

  return (
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
      onClick={goToAssetPage}
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
          {/* <Icon as={data.icon} boxSize="64px" /> */}
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
  );
};

export default AssetCountCard;
