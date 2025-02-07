import { Heading } from '@chakra-ui/react';

const PageHeader = ({ children }: { children: string | React.ReactNode }) => {
  return (
    <Heading as="h3" size={{ base: 'lg', lg: 'xl' }} color="primary.500">
      {children}
    </Heading>
  );
};

export default PageHeader;
