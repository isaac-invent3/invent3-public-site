import { Heading } from '@chakra-ui/react';

const PageHeader = ({ children }: { children: string | React.ReactNode }) => {
  return (
    <Heading
      as="h3"
      fontWeight={800}
      fontSize={{ base: '24px', md: '32px' }}
      lineHeight={{ base: '28.51px', md: '38.02px' }}
      color="primary.500"
    >
      {children}
    </Heading>
  );
};

export default PageHeader;
