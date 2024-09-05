import { Heading } from '@chakra-ui/react';
import React from 'react';

const PageHeader = ({ children }: { children: string }) => {
  return (
    <Heading
      as="h3"
      fontWeight={800}
      fontSize="32px"
      lineHeight="38.02px"
      color="primary.500"
    >
      {children}
    </Heading>
  );
};

export default PageHeader;
