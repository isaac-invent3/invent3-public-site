import { Heading } from '@chakra-ui/react';

const PageHeader = ({ children }: { children: string | React.ReactNode }) => {
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
