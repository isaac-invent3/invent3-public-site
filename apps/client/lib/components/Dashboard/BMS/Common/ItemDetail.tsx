import { Flex, Text, TextProps, VStack } from '@chakra-ui/react';
import Image from 'next/image';

interface ItemDetailProps {
  icon: string;
  value: string;
  title: string;
  valueStyle?: TextProps;
}
const ItemDetail = (props: ItemDetailProps) => {
  const { icon, value, title, valueStyle } = props;
  return (
    <VStack spacing="8px">
      <Flex width="24px" height="24px" position="relative">
        <Image src={icon} fill alt="icon" />
      </Flex>
      <Text fontSize="28px" fontWeight={800} lineHeight="100%" {...valueStyle}>
        {value}
      </Text>
      <Text color="neutral.600" textAlign="center">
        {title}
      </Text>
    </VStack>
  );
};

export default ItemDetail;
