import { Text } from '@chakra-ui/react';
import React from 'react';

interface DetailProps {
  children: React.ReactNode;
  color?: string;
  customStyles?: { [key: string]: unknown };
}
const DetailContent = (props: DetailProps) => {
  const { children, color, customStyles } = props;
  return (
    <Text
      fontSize="14px"
      fontWeight={500}
      lineHeight="16.63px"
      color={color ?? 'black'}
      {...customStyles}
    >
      {children}
    </Text>
  );
};

export { DetailContent };
