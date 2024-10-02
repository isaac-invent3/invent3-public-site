import { Heading } from '@chakra-ui/react';
import React from 'react';

interface CardHeaderProps {
  children: React.ReactNode;
}
const CardHeader = ({ children }: CardHeaderProps) => {
  return (
    <Heading
      color="Neutral.800"
      fontSize="16px"
      lineHeight="19.01px"
      fontWeight={700}
    >
      {children}
    </Heading>
  );
};

export default CardHeader;
