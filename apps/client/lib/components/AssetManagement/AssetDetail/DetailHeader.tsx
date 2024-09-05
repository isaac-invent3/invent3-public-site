import { Text } from '@chakra-ui/react';
import React from 'react';

interface DetailHeaderProps {
  children: React.ReactNode;
  customStyles?: { [key: string]: unknown };
}
const DetailHeader = (props: DetailHeaderProps) => {
  const { children, customStyles } = props;
  return (
    <Text
      width="full"
      fontSize="16px"
      lineHeight="19.01px"
      fontWeight={700}
      py="4px"
      color="neutral.800"
      borderBottomWidth="1px"
      borderColor="#BBBBBB80"
      {...customStyles}
    >
      {children}
    </Text>
  );
};

export default DetailHeader;
