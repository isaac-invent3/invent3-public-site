import { Text } from '@chakra-ui/react';
import React from 'react';

interface DetailHeaderProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  customStyles?: { [key: string]: unknown };
}
const DetailHeader = (props: DetailHeaderProps) => {
  const { children, variant, customStyles } = props;
  return (
    <Text
      width="full"
      size="lg"
      fontWeight={700}
      pt={variant === 'primary' ? '0px' : '4px'}
      pb={variant === 'primary' ? '8px' : '4px'}
      color={variant === 'primary' ? 'primary.main' : 'neutral.800'}
      borderBottomWidth="1px"
      borderColor="#BBBBBB80"
      {...customStyles}
    >
      {children}
    </Text>
  );
};

export default DetailHeader;
