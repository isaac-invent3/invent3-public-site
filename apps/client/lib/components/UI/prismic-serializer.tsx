import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { JSXFunctionSerializer } from '@prismicio/react'; // For block types

const serializer: JSXFunctionSerializer = (
  type,
  element,
  content,
  children
) => {
  switch (type) {
    case 'heading1': {
      return (
        <Heading
          fontSize={{ base: '24px', lg: '32px' }}
          lineHeight={{ base: '32px', lg: '40px' }}
          mb="8px"
          color="black"
          as="h1"
        >
          {content}
        </Heading>
      );
    }
    case 'heading2':
    case 'heading3':
    case 'heading4':
    case 'heading5':
    case 'heading6': {
      return (
        <Heading
          fontSize={{ base: '16px', lg: '24px' }}
          lineHeight={{ base: '24px', lg: '32px' }}
          mb="8px"
          color="black"
          as="h1"
        >
          {children}
        </Heading>
      );
    }
    case 'paragraph': {
      return (
        <Text
          mb={{ base: '20px', lg: '20px' }}
          fontWeight={400}
          fontSize={{ base: '14px', lg: '20px' }}
          lineHeight={{ base: '20px', lg: '24px' }}
          color="black"
        >
          {children}
        </Text>
      );
    }
    default:
      return null;
  }
};

export default serializer;
